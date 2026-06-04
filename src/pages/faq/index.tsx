import Link from 'next/link';

import ContentPageLayout from '@/components/content/ContentPageLayout';

const faqItems = [
  {
    q: 'What is TestFCM.in?',
    a: 'TestFCM.in is a free online tool for sending test push notifications via Firebase Cloud Messaging HTTP v1. You provide a Project ID, OAuth access token, and device token — we forward the message to Google\'s FCM API through a server proxy.',
  },
  {
    q: 'Is TestFCM free to use?',
    a: 'Yes. The core notification testing features are free. The site is supported by advertising on documentation and content pages.',
  },
  {
    q: 'Why does TestFCM not support Legacy server keys?',
    a: 'Google shut down the FCM Legacy HTTP API for most projects. HTTP v1 with OAuth tokens is the only supported approach for new integrations. Legacy server keys return 404 errors from Google.',
  },
  {
    q: 'What is the difference between Access Token and Device Token?',
    a: 'The Access Token is a short-lived OAuth token (usually starting with ya29.) from gcloud auth print-access-token — it authorizes the API call. The Device Token (often APA91…) identifies the phone or app instance that should receive the push.',
  },
  {
    q: 'Why do I get 401 UNAUTHENTICATED?',
    a: 'Your OAuth token expired or is invalid. Generate a new one with gcloud auth print-access-token. Make sure you did not paste the device token into the Access Token field.',
  },
  {
    q: 'Why does the send succeed but I see no notification?',
    a: 'If the app is in the foreground, you may need to handle the message in code. Check notification permissions, Android notification channels, and iOS APNs setup. See our common errors guide for more detail.',
  },
  {
    q: 'Does TestFCM store my tokens?',
    a: 'Tokens are sent to our server only when you click Send Notification, then forwarded to Google. If you use Save Locally or Google sign-in, request data may be stored in your browser or Firebase account.',
  },
  {
    q: 'Can I use TestFCM in production?',
    a: 'TestFCM is for development and QA testing only. Production apps should send notifications from your own secure backend using a service account — not through a public web form.',
  },
  {
    q: 'How do I save notification requests?',
    a: 'Click Save Locally after filling the form, give the request a name, and find it in the Saved Notifications list. Sign in with Google to sync saves across devices.',
  },
  {
    q: 'What does "Re-save required" mean on saved items?',
    a: 'That request was saved using the old Legacy API (server key). Re-create and save it with HTTP v1 credentials: Project ID and OAuth access token.',
  },
  {
    q: 'Why does the browser block direct FCM calls?',
    a: 'Google\'s FCM API does not allow cross-origin requests from websites. TestFCM uses /api/send-fcm on the server to avoid CORS.',
  },
  {
    q: 'Where can I learn more?',
    a: 'Browse our documentation hub with guides on HTTP v1 setup, OAuth tokens, device tokens, Android/iOS testing, and error troubleshooting.',
  },
];

export default function FaqPage() {
  return (
    <ContentPageLayout
      title='Frequently Asked Questions'
      description='Answers to common questions about TestFCM.in, FCM HTTP v1, OAuth tokens, device tokens, and push notification testing.'
      badge='FAQ'
      showAd
    >
      <p>
        Quick answers about using TestFCM.in. For detailed walkthroughs, visit the{' '}
        <Link href='/docs'>documentation hub</Link> or the{' '}
        <Link href='/docs/complete-fcm-testing-guide'>complete testing guide</Link>.
      </p>
      {faqItems.map((item) => (
        <div key={item.q} className='mb-6'>
          <h2>{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}
    </ContentPageLayout>
  );
}
