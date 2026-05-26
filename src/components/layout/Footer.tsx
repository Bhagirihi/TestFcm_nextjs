import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='border-t border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/80'>
      <div className='mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 text-sm text-slate-500 sm:flex-row sm:px-6 lg:px-8 dark:text-slate-400'>
        <p>&copy; {new Date().getFullYear()} TestFCM.in — Push Notification Tester</p>
        <nav className='flex flex-wrap items-center justify-center gap-x-6 gap-y-2'>
          <Link href='/privacy' className='transition hover:text-primary-600 dark:hover:text-primary-400'>
            Privacy Policy
          </Link>
          <Link href='/contactus' className='transition hover:text-primary-600 dark:hover:text-primary-400'>
            Contact
          </Link>
          <a
            href='https://www.dhruvdave.in/'
            target='_blank'
            rel='noopener noreferrer'
            className='transition hover:text-primary-600 dark:hover:text-primary-400'
          >
            dhruvdave.in
          </a>
        </nav>
      </div>
    </footer>
  );
}
