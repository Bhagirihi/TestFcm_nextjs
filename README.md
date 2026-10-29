# TestFCM.in

Free online tool to send and test Firebase Cloud Messaging (FCM) HTTP v1 push
notifications on Android, iOS, and web. Live at https://www.testfcm.in

Paste a Firebase Project ID, a short-lived OAuth access token
(`gcloud auth print-access-token`), and a device registration token, then
dispatch a notification. The browser never calls Google directly: the
server-side proxy in `src/pages/api/send-fcm.js` forwards the request so
CORS does not block it.

## Security model — read this before contributing

- **OAuth access tokens are never saved.** Not in localStorage, not in
  Firebase. A saved request stores the project ID, device token, title,
  body and data only. Re-sending a saved request needs a fresh token.
- **Never commit `.env`.** It is gitignored. Copy `.env.example` to
  `.env.local` for local work; production values live in Vercel env vars.
  If a secret ever lands in git history, rotate it first — deleting the
  file does not un-publish history.
- **The send proxy is rate-limited and validated** (project-ID format,
  payload size/shape, per-IP limit) and forwards FCM's real status code.
- **Contact/welcome emails use a fixed sender** with the visitor's address
  in `replyTo`, validated inputs, and HTML-escaped template fields.
- **No CSP is set yet** (see `vercel.json`): a strict CSP must be tested
  against Google sign-in, AdSense and Analytics before it is added, or it
  will break them.

## Run locally

```bash
npm install  # requires Node 24 (Vercel discontinued Node 20)
cp .env.example .env.local   # fill in Gmail + AdSense values for your own env
npm run dev
```

## Checks

```bash
npm run typecheck
npm run lint:strict
npm test
npm run build
```

Note: `next.config.js` currently still sets `ignoreBuildErrors` and
`ignoreDuringBuilds`. Removing those flags is intentionally left as a
separate step — it must only land once typecheck + lint pass cleanly on
the branch, or a deploy that used to succeed will start failing.

## Monetization

AdSense only, in production, after cookie consent, on content pages
(home resources + docs sidebar) — never in or around the send form.
There is no premium tier, paywall, or donation flow in this codebase.
