import Link from 'next/link';
import { useRouter } from 'next/router';
import { useTheme } from 'next-themes';
import React, { useState } from 'react';
import { connect } from 'react-redux';

import Firebaseauth from '@/components/Firebase';

import DarkMoon from '~/svg/DarkMoon.svg';
import Firebase from '~/svg/Firebase.svg';
import Light from '~/svg/light.svg';

function navbar(props: any) {
  const { theme, setTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const openDrawer = async () => {
    await setIsOpen(!isOpen);
  };

  return (
    <nav className='start-0 fixed top-0 z-20 w-full border-gray-200 bg-white dark:bg-gray-900'>
      <div className='mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4'>
        <a href='https://www.testfcm.in/' className='flex items-center space-x-3 rtl:space-x-reverse'>
          {/* <Image width={32 * 3} height={32 * 3} priority alt='APPLOGO' src={'/svg/app_logo.svg'} /> */}
          <Firebase className='flex h-10 w-10 items-center text-center' />
          <h1 className='mx-6  text-base font-bold  md:text-xl'>TestFCM</h1>
        </a>

        <div className='flex space-x-3 rtl:space-x-reverse md:order-2  md:space-x-0'>
          <button
            aria-label="Google_login"
            type='button'
            className='mx-2 rounded-lg border  text-center text-sm font-medium  hover:bg-gray-200 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-gray-100 dark:focus:ring-blue-800'
          >
            <Firebaseauth />
          </button>
          <button
            aria-label="them_change"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            className={`mx-2 rounded-lg border px-4 py-2 text-center text-sm font-medium ${
              theme === 'dark' ? 'text-white' : 'text-black'
            }   focus:outline-none focus:ring-4 focus:ring-blue-300 dark:hover:bg-gray-100 dark:hover:text-black hover:bg-gray-200 dark:focus:ring-blue-800`}
          >
            {theme === 'dark' ? (
              <DarkMoon className={`flex h-5 w-5 items-center text-center ${
                theme === 'dark' ? 'text-white' : 'text-black'
              }`} />
            ) : (
              <Light fill={'bg-black'} className={`flex h-5 w-5 items-center text-center text-black
              `} />
            )}
          </button>
          <button
            aria-label="mobile_menu"
            onClick={() => openDrawer()}
            data-collapse-toggle='navbar-cta'
            type='button'
            className='inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 md:hidden'
            aria-controls='navbar-cta'
            aria-expanded='false'
          >
            <span className='sr-only'>Open main menu</span>
            <svg
              className='h-5 w-5'
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 17 14'
            >
              <path
                stroke='currentColor'
                stroke-linecap='round'
                stroke-linejoin='round'
                stroke-width='2'
                d='M1 1h15M1 7h15M1 13h15'
              />
            </svg>
          </button>
        </div>
        <div
          className={`${isOpen ? 'block' : 'hidden'} w-full items-center justify-between md:order-1 md:flex md:w-auto`}
          id='navbar-cta'
        >
          <ul className='mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0 md:dark:bg-gray-900'>
            <li>
              <Link
                //onClick={() => router.reload(window.location.pathname)}
                href='/'
                className={`block rounded py-2 px-3 text-xl ${
                  router.asPath == '/#TestFCM' ? 'text-blue-500' : 'text-white-700'
                } hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                // onClick={() => router.reload(window.location.pathname)}
                href='/contactus'
                className={`block rounded py-2 px-3 text-xl ${
                  router.asPath == '/#LetsConnect' ? 'text-blue-500' : 'text-white-700'
                } hover:bg-gray-100 dark:border-gray-700  dark:hover:bg-gray-700 dark:hover:text-white md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500`}
                aria-current='page'
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
const mapStateToProps = (state: any) => {
  console.log('SATE REDUX', state);
  return {
    user: state.main.user,
  };
};

export default connect(mapStateToProps, [])(navbar);
