import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';

const sections = [
  {
    title: 'Information we collect',
    body: [
      'When you use TestFCM.in to send or save push notification requests, field values you enter (such as Project ID, device token, title, and message) may be stored locally in your browser via localStorage if you choose "Save Locally".',
      'If you sign in with Google, we store basic profile information (name, email, profile photo) in Firebase to sync saved notifications across devices.',
      'When you submit the contact form, we collect your name, email address, subject, and message to respond to your inquiry.',
      'We use Google Analytics to collect anonymous usage data such as pages visited, device type, and general location.',
    ],
  },
  {
    title: 'Cookies and advertising',
    body: [
      'TestFCM.in uses cookies and similar technologies through Google AdSense and Google Analytics.',
      'Google AdSense uses cookies to serve ads based on your prior visits to this site or other websites. Google\'s use of advertising cookies enables it and its partners to serve ads to you.',
      'You may opt out of personalized advertising by visiting Google Ads Settings at https://www.google.com/settings/ads.',
      'Third-party vendors, including Google, use cookies to serve ads. You can opt out of third-party vendor use of cookies by visiting https://www.aboutads.info.',
    ],
  },
  {
    title: 'How we use your information',
    body: [
      'To provide the FCM notification testing service.',
      'To save and restore your notification requests when you use local storage or Google sign-in.',
      'To respond to contact form submissions.',
      'To analyze site traffic and improve the service.',
      'To display relevant advertisements through Google AdSense.',
    ],
  },
  {
    title: 'Third-party services',
    body: [
      'Google Firebase (authentication and data storage)',
      'Google Analytics (usage analytics)',
      'Google AdSense (advertising)',
      'Google Firebase Cloud Messaging API (notification delivery — credentials you provide are forwarded server-side only when you send a notification)',
    ],
  },
  {
    title: 'Data retention and security',
    body: [
      'Data saved locally remains in your browser until you clear it. Data synced via Google sign-in is stored in Firebase until you delete it or remove your account access.',
      'OAuth access tokens and device tokens you enter are processed to send notifications and may be stored if you save a request locally. Do not share production credentials on shared devices.',
      'We do not sell your personal information to third parties.',
    ],
  },
  {
    title: 'Your choices',
    body: [
      'You can clear saved data by clearing your browser localStorage or signing out.',
      'You can disable cookies in your browser settings, though some features may not work correctly.',
      'You can use an ad blocker, though this supports the free operation of the site.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For privacy-related questions, contact us via the Contact page at https://www.testfcm.in/contactus or email hello@testfcm.in.',
    ],
  },
];

export default function PrivacyPage() {
  return (
    <Layout>
      <Seo
        templateTitle='Privacy Policy'
        description='Privacy Policy for TestFCM.in — how we collect, use, and protect your data, including Google AdSense and Analytics.'
      />
      <Navbar />
      <main className='pt-20 pb-12'>
        <article className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
          <header className='mb-10 text-center'>
            <span className='tf-badge'>Legal</span>
            <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
              Privacy Policy
            </h1>
            <p className='mt-3 text-sm text-slate-500 dark:text-slate-400'>
              Last updated: May 24, 2026
            </p>
          </header>

          <div className='panel-card space-y-8 text-left'>
            <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
              TestFCM.in (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website{' '}
              <a href='https://www.testfcm.in' className='text-primary-600 hover:underline dark:text-primary-400'>
                https://www.testfcm.in
              </a>
              . This Privacy Policy explains how we collect, use, and safeguard information when you use our
              free Firebase Cloud Messaging testing tool.
            </p>

            {sections.map((section) => (
              <section key={section.title}>
                <h2 className='text-lg font-semibold text-slate-900 dark:text-white'>{section.title}</h2>
                <ul className='mt-3 space-y-2'>
                  {section.body.map((paragraph) => (
                    <li key={paragraph} className='text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
                      {paragraph}
                    </li>
                  ))}
                </ul>
              </section>
            ))}

            <p className='border-t border-slate-200 pt-6 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400'>
              This policy may be updated from time to time. Continued use of the site after changes constitutes
              acceptance of the updated policy. See also Google&apos;s{' '}
              <a
                href='https://policies.google.com/privacy'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary-600 hover:underline dark:text-primary-400'
              >
                Privacy Policy
              </a>{' '}
              and{' '}
              <a
                href='https://policies.google.com/technologies/ads'
                target='_blank'
                rel='noopener noreferrer'
                className='text-primary-600 hover:underline dark:text-primary-400'
              >
                Advertising Policy
              </a>
              .
            </p>
          </div>

          <p className='mt-8 text-center text-sm text-slate-500 dark:text-slate-400'>
            Questions?{' '}
            <Link href='/contactus' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
              Contact us
            </Link>
          </p>
        </article>
      </main>
    </Layout>
  );
}
