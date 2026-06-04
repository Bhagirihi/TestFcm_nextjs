import Link from 'next/link';

import Layout from '@/components/layout/Layout';
import Seo from '@/components/Seo';
import Navbar from '@/components/Navbar';

const sections = [
  {
    title: 'Acceptance of terms',
    body: [
      'By accessing or using TestFCM.in, you agree to these Terms of Service and our Privacy Policy.',
      'If you do not agree, do not use the website or its services.',
    ],
  },
  {
    title: 'Description of service',
    body: [
      'TestFCM.in provides a free online tool for developers to test Firebase Cloud Messaging (FCM) HTTP v1 push notifications.',
      'The service is provided for development and testing purposes. We do not guarantee delivery of notifications to any device or platform.',
      'Features may change, be suspended, or be discontinued at any time without notice.',
    ],
  },
  {
    title: 'Your responsibilities',
    body: [
      'You are responsible for all information you enter, including Firebase project IDs, OAuth access tokens, device tokens, and notification content.',
      'You must have lawful authority to use any credentials, tokens, or data you submit through the service.',
      'You must not use TestFCM.in to send spam, phishing messages, malware, or any content that violates applicable law or third-party terms (including Google Firebase and FCM policies).',
      'Do not enter production secrets on shared or untrusted devices. Saved data may be stored in your browser or synced via Google sign-in at your discretion.',
    ],
  },
  {
    title: 'No professional advice',
    body: [
      'Documentation and guides on this site are for general information only and do not constitute professional, legal, or security advice.',
      'You are solely responsible for securing your Firebase projects and complying with Google\'s terms and applicable regulations.',
    ],
  },
  {
    title: 'Intellectual property',
    body: [
      'The TestFCM.in name, branding, site design, and original content are owned by the site operator unless otherwise stated.',
      'Firebase, Google Cloud, and related marks are trademarks of Google LLC. TestFCM.in is not affiliated with or endorsed by Google.',
      'You may link to TestFCM.in for lawful purposes. Do not scrape, mirror, or republish substantial portions of the site without permission.',
    ],
  },
  {
    title: 'Third-party services',
    body: [
      'The site integrates with third-party services including Google Firebase, Google Analytics, Google AdSense, and Google Sign-In.',
      'Your use of those services is subject to their respective terms and privacy policies. We are not responsible for third-party services or outages.',
    ],
  },
  {
    title: 'Disclaimer of warranties',
    body: [
      'TestFCM.in is provided on an "as is" and "as available" basis without warranties of any kind, whether express or implied, including merchantability, fitness for a particular purpose, and non-infringement.',
      'We do not warrant that the service will be uninterrupted, error-free, or free of harmful components.',
    ],
  },
  {
    title: 'Limitation of liability',
    body: [
      'To the fullest extent permitted by law, TestFCM.in and its operator shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, revenue, or profits arising from your use of the service.',
      'Our total liability for any claim relating to the service shall not exceed the amount you paid to use TestFCM.in (which is zero for the free service).',
    ],
  },
  {
    title: 'Indemnification',
    body: [
      'You agree to indemnify and hold harmless TestFCM.in and its operator from any claims, damages, or expenses (including reasonable legal fees) arising from your use of the service, your content, or your violation of these terms.',
    ],
  },
  {
    title: 'Changes to these terms',
    body: [
      'We may update these Terms of Service from time to time. The "Last updated" date at the top of this page will reflect the latest revision.',
      'Continued use of the site after changes constitutes acceptance of the updated terms.',
    ],
  },
  {
    title: 'Governing law',
    body: [
      'These terms are governed by the laws of India, without regard to conflict-of-law principles.',
      'Any disputes shall be subject to the exclusive jurisdiction of courts in Gujarat, India, where applicable.',
    ],
  },
  {
    title: 'Contact',
    body: [
      'For questions about these Terms of Service, contact us via the Contact page at https://www.testfcm.in/contactus or email hello@testfcm.in.',
    ],
  },
];

export default function TermsPage() {
  return (
    <Layout>
      <Seo
        templateTitle='Terms of Service'
        description='Terms of Service for TestFCM.in — rules and conditions for using the free FCM push notification testing tool.'
      />
      <Navbar />
      <main className='pt-20 pb-12'>
        <article className='mx-auto max-w-3xl px-4 sm:px-6 lg:px-8'>
          <header className='mb-10 text-center'>
            <span className='tf-badge'>Legal</span>
            <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
              Terms of Service
            </h1>
            <p className='mt-3 text-sm text-slate-500 dark:text-slate-400'>Last updated: May 24, 2026</p>
          </header>

          <div className='panel-card space-y-8 text-left'>
            <p className='text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
              These Terms of Service (&quot;Terms&quot;) govern your access to and use of TestFCM.in (&quot;we&quot;,
              &quot;us&quot;, or &quot;our&quot;) at{' '}
              <a href='https://www.testfcm.in' className='text-primary-600 hover:underline dark:text-primary-400'>
                https://www.testfcm.in
              </a>
              . Please read them together with our{' '}
              <Link href='/privacy' className='text-primary-600 hover:underline dark:text-primary-400'>
                Privacy Policy
              </Link>
              .
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
              By using TestFCM.in you acknowledge that you have read and agree to these Terms and our Privacy Policy.
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
