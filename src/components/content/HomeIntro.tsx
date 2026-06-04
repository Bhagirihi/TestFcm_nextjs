import Link from 'next/link';

export default function HomeIntro() {
  return (
    <div className='panel-card mx-auto mb-8 max-w-4xl text-left'>
      <h2 className='text-lg font-semibold text-slate-900 dark:text-white'>
        Free online FCM push notification tester
      </h2>
      <div className='prose-content mt-4 !text-left'>
        <p>
          TestFCM.in helps mobile and web developers send test push notifications through Firebase Cloud Messaging
          (FCM) HTTP v1 without writing backend code. Paste your Project ID, OAuth access token, and device
          registration token, then dispatch a notification to a real Android, iOS, or web client in seconds.
        </p>
        <p>
          Google deprecated the Legacy FCM API (server key). TestFCM supports HTTP v1 only — the current standard
          that uses short-lived OAuth tokens and the endpoint{' '}
          <code>fcm.googleapis.com/v1/projects/…/messages:send</code>. Our server-side proxy forwards requests so
          your browser is not blocked by CORS when calling Google&apos;s API.
        </p>
        <p>
          Whether you are debugging a new Firebase integration, verifying notification channels on Android, or
          checking APNs delivery on iOS, this tool gives you a fast feedback loop. Read our{' '}
          <Link href='/docs/complete-fcm-testing-guide'>complete testing guide</Link>, browse the{' '}
          <Link href='/docs'>documentation hub</Link>, or jump straight to the form below.
        </p>
      </div>
    </div>
  );
}
