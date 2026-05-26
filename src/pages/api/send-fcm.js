/**
 * Proxies FCM HTTP v1 send requests server-side to avoid browser CORS blocks.
 */
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { projectID, accessToken, payload } = req.body || {};

  if (!payload) {
    return res.status(400).json({ error: 'Missing payload' });
  }

  if (!projectID || !accessToken) {
    return res.status(400).json({ error: 'Missing projectID or accessToken' });
  }

  try {
    const fcmRes = await fetch(
      `https://fcm.googleapis.com/v1/projects/${encodeURIComponent(projectID)}/messages:send`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      }
    );

    const text = await fcmRes.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      data = { raw: text };
    }

    return res.status(200).json({
      ok: fcmRes.status >= 200 && fcmRes.status < 300,
      fcmStatus: fcmRes.status,
      data,
    });
  } catch (err) {
    console.error('send-fcm proxy error:', err);
    return res.status(500).json({ error: 'Failed to reach FCM', message: err.message });
  }
}
