import Link from 'next/link';
import { useState } from 'react';

export default function BetaWarning() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;

  return (
    <div
      id='sticky-banner'
      tabIndex={-1}
      className='fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-3xl rounded-2xl border border-primary-200/60 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-primary-800/40 dark:bg-slate-900/95 sm:left-auto sm:right-6 sm:max-w-lg'
    >
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-start gap-3'>
          <span className='inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/50'>
            <svg className='h-4 w-4 text-primary-600 dark:text-primary-400' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='currentColor' viewBox='0 0 18 19'>
              <path d='M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z' />
            </svg>
          </span>
          <p className='text-sm text-slate-600 dark:text-slate-300'>
            We are in Development Mode for HTTP V1. Found any issue?{' '}
            <Link href='/contactus' className='font-semibold text-primary-600 underline-offset-2 hover:underline dark:text-primary-400'>
              Report Us
            </Link>
          </p>
        </div>
        <button
          onClick={() => setVisible(false)}
          type='button'
          className='icon-btn shrink-0'
          aria-label='Dismiss banner'
        >
          <svg className='h-4 w-4' aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 14 14'>
            <path stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6' />
          </svg>
        </button>
      </div>
    </div>
  );
}
