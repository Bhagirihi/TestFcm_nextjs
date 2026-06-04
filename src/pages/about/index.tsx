import Link from 'next/link';

import ContentPageLayout from '@/components/content/ContentPageLayout';

export default function AboutPage() {
  return (
    <ContentPageLayout
      title='About TestFCM.in'
      description='Learn who built TestFCM, why it exists, and how we help developers test Firebase Cloud Messaging push notifications.'
      badge='About'
      showAd
    >
      <h2>Our mission</h2>
      <p>
        TestFCM.in is a free developer tool created to simplify Firebase Cloud Messaging (FCM) testing. Mobile and web
        teams need a fast way to verify push notifications during development — without deploying a backend or writing
        curl commands every time credentials change.
      </p>
      <p>
        We focus exclusively on the FCM HTTP v1 API, which is Google&apos;s supported method for sending notifications.
        The deprecated Legacy server key API is not supported because it no longer works for most Firebase projects.
      </p>

      <h2>What TestFCM offers</h2>
      <ul>
        <li>Browser-based FCM HTTP v1 send form with validation and clear error messages</li>
        <li>Server-side proxy to avoid CORS when calling Google&apos;s FCM endpoint</li>
        <li>Step-by-step setup guide integrated into the testing workflow</li>
        <li>Save and re-test notification requests locally or via Google sign-in sync</li>
        <li>Original documentation, FAQ, and troubleshooting guides on this site</li>
      </ul>

      <h2>Who it is for</h2>
      <p>
        TestFCM is built for Android developers, iOS engineers, Flutter and React Native teams, and web developers
        integrating Firebase Messaging. If you are onboarding a new project, debugging token issues, or demonstrating
        push to stakeholders, this site gives you immediate feedback on whether your FCM pipeline works.
      </p>

      <h2>Security &amp; privacy</h2>
      <p>
        OAuth access tokens and device tokens you enter are used only to send the notification you request. Saved
        requests may be stored in your browser or Firebase account if you choose to sign in. We do not sell personal
        data. Read our <Link href='/privacy'>Privacy Policy</Link> and{' '}
        <Link href='/terms'>Terms of Service</Link> for details on cookies, AdSense, and acceptable use.
      </p>

      <h2>Contact &amp; feedback</h2>
      <p>
        TestFCM is maintained by{' '}
        <a href='https://www.dhruvdave.in/' target='_blank' rel='noopener noreferrer'>
          Dhruv Dave
        </a>
        . Found a bug or have a feature idea?{' '}
        <Link href='/contactus'>Contact us</Link> — we read every message and use feedback to improve the tool and
        documentation.
      </p>

      <h2>Advertising</h2>
      <p>
        TestFCM is supported by advertising through Google AdSense on content-rich pages. Ads appear only alongside
        substantial editorial content — not on legal, contact, or error pages — in line with Google publisher policies.
      </p>
    </ContentPageLayout>
  );
}
