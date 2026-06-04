import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80'>
      <div className='mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8'>
        <div className='grid gap-8 sm:grid-cols-2 lg:grid-cols-4'>
          <div>
            <p className='font-semibold text-slate-900 dark:text-white'>TestFCM.in</p>
            <p className='mt-2 text-sm text-slate-500 dark:text-slate-400'>
              Free online Firebase Cloud Messaging HTTP v1 push notification tester for developers.
            </p>
          </div>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>Guides</p>
            <nav className='mt-3 flex flex-col gap-2 text-sm'>
              <Link href='/docs' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                Documentation
              </Link>
              <Link href='/docs/complete-fcm-testing-guide' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                Complete testing guide
              </Link>
              <Link href='/docs/common-fcm-errors' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                Troubleshooting
              </Link>
            </nav>
          </div>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>Site</p>
            <nav className='mt-3 flex flex-col gap-2 text-sm'>
              <Link href='/about' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                About
              </Link>
              <Link href='/faq' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                FAQ
              </Link>
              <Link href='/contactus' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                Contact
              </Link>
            </nav>
          </div>
          <div>
            <p className='text-xs font-semibold uppercase tracking-wider text-slate-400'>Legal</p>
            <nav className='mt-3 flex flex-col gap-2 text-sm'>
              <Link href='/terms' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                Terms of Service
              </Link>
              <Link href='/privacy' className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'>
                Privacy Policy
              </Link>
              <a
                href='https://www.dhruvdave.in/'
                target='_blank'
                rel='noopener noreferrer'
                className='text-slate-600 hover:text-primary-600 dark:text-slate-400 dark:hover:text-primary-400'
              >
                dhruvdave.in
              </a>
            </nav>
          </div>
        </div>
        <p className='mt-8 border-t border-slate-200 pt-6 text-center text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500'>
          &copy; {new Date().getFullYear()} TestFCM.in — Push Notification Tester
        </p>
      </div>
    </footer>
  );
}
