/**
 * Proxies FCM HTTP v1 send requests server-side to avoid browser CORS blocks.
 *
 * This is an intentionally narrow proxy: it validates the project ID,
 * payload shape and size, and applies a per-IP rate limit before forwarding
 * the caller-supplied OAuth token to FCM. It never stores the token, and
 * it forwards FCM's real status code so the client can show a real error
 * (expired token, unknown project, invalid payload) instead of a generic one.
 */
import { isWithinRateLimit } from '../../lib/server-utils';

const MAX_BODY_BYTES = 100 * 1024;
const PROJECT_ID_RE = /^[a-z][a-z0-9-]{5,29}$/;

function looksLikeDeviceToken(token) {
  return token.includes('APA91') || (token.includes(':') && !token.startsWith('ya29.'));
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!isWithinRateLimit(req, 'send-fcm', 60, 60 * 1000)) {
    return res.status(429).json({ error: 'Too many requests. Please wait a minute and try again.' });
  }

  const { projectID, accessToken, payload } = req.body || {};

  if (!payload || typeof payload !== 'object' || Array.isArray(payload)) {
    return res.status(400).json({ error: 'Missing payload' });
  }

  if (JSON.stringify(req.body).length > MAX_BODY_BYTES) {
    return res.status(413).json({ error: 'Payload too large' });
  }

  if (typeof projectID !== 'string' || !PROJECT_ID_RE.test(projectID) || projectID.endsWith('-')) {
    return res.status(400).json({ error: 'Invalid projectID' });
  }

  if (
    typeof accessToken !== 'string' ||
    accessToken.length < 10 ||
    accessToken.length > 2048 ||
    /\s/.test(accessToken) ||
    looksLikeDeviceToken(accessToken)
  ) {
    return res.status(400).json({ error: 'Invalid accessToken' });
  }

  const message = payload.message;
  if (!message || typeof message !== 'object' || typeof message.token !== 'string' || !message.token) {
    return res.status(400).json({ error: 'Payload must contain message.token' });
  }
  if (message.token === accessToken) {
    return res.status(400).json({ error: 'Access token and device token must be different' });
  }
  if (message.notification) {
    const { title, body } = message.notification;
    if (
      (title !== undefined && (typeof title !== 'string' || title.length > 500)) ||
      (body !== undefined && (typeof body !== 'string' || body.length > 4000))
    ) {
      return res.status(400).json({ error: 'Notification title/body too long or invalid' });
    }
  }

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);
    let fcmRes;
    try {
      fcmRes = await fetch(
        `https://fcm.googleapis.com/v1/projects/${encodeURIComponent(projectID)}/messages:send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
          body: JSON.stringify(payload),
          signal: controller.signal,
        }
      );
    } finally {
      clearTimeout(timeout);
    }

    const text = await fcmRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text.slice(0, 2000) };
    }

    return res.status(fcmRes.status).json({
      ok: fcmRes.status >= 200 && fcmRes.status < 300,
      fcmStatus: fcmRes.status,
      data,
    });
  } catch (err) {
    console.error('send-fcm proxy error:', err?.name || 'fetch failed');
    return res.status(502).json({ error: 'Failed to reach FCM' });
  }
}
