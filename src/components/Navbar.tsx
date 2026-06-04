import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

import Firebaseauth from '@/components/Firebase';
import ThemeLogo from '@/components/ThemeLogo';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/docs', label: 'Guides' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contactus', label: 'Contact' },
  { href: '/privacy', label: 'Privacy' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const isActive = (path: string) => {
    if (path === '/docs') return router.pathname.startsWith('/docs');
    return router.asPath === path || router.pathname === path;
  };

  return (
    <nav className='glass-nav'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8'>
        <Link href='/' className='flex items-center gap-3'>
          <ThemeLogo />
          <div className='hidden sm:block'>
            <p className='text-sm font-bold leading-tight text-slate-900 dark:text-white'>TestFCM</p>
            <p className='text-xs text-slate-500 dark:text-slate-400'>Push Notification Tester</p>
          </div>
        </Link>

        <div className='flex items-center gap-2 md:order-2'>
          <button
            aria-label='Google_login'
            type='button'
            className='inline-flex items-center rounded-xl p-1.5 transition hover:bg-slate-100 dark:hover:bg-slate-800'
          >
            <Firebaseauth />
          </button>
          <ThemeToggle />
          <button
            aria-label='mobile_menu'
            onClick={() => setIsOpen(!isOpen)}
            type='button'
            className='inline-flex h-9 w-9 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 md:hidden'
            aria-controls='navbar-cta'
            aria-expanded={isOpen}
          >
            <span className='sr-only'>Open main menu</span>
            <svg className='h-5 w-5' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 17 14'>
              <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M1 1h15M1 7h15M1 13h15' />
            </svg>
          </button>
        </div>

        <div
          className={`${isOpen ? 'block' : 'hidden'} absolute left-0 right-0 top-full max-h-[70vh] overflow-y-auto border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 md:static md:block md:max-h-none md:border-0 md:bg-transparent md:p-0 md:backdrop-blur-none`}
          id='navbar-cta'
        >
          <ul className='flex flex-col gap-1 md:flex-row md:items-center md:gap-0.5'>
            {navLinks.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    isActive(href)
                      ? 'bg-primary-50 text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                  }`}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
