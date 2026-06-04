import Link from 'next/link';

type CookieConsentProps = {
  onAccept: () => void;
  onReject: () => void;
};

export default function CookieConsent({ onAccept, onReject }: CookieConsentProps) {
  return (
    <div
      role='dialog'
      aria-live='polite'
      aria-label='Cookie consent'
      className='fixed inset-x-0 bottom-0 z-[100] border-t border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur-md dark:border-slate-700 dark:bg-slate-900/95 sm:p-5'
    >
      <div className='mx-auto flex max-w-7xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <div className='flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300'>
          <p className='font-medium text-slate-900 dark:text-white'>We use cookies</p>
          <p className='mt-1'>
            TestFCM.in uses cookies for Google Analytics and Google AdSense to measure traffic and support this
            free tool. Essential cookies keep the site working. See our{' '}
            <Link href='/privacy' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
              Privacy Policy
            </Link>{' '}
            and{' '}
            <Link href='/terms' className='font-medium text-primary-600 hover:underline dark:text-primary-400'>
              Terms of Service
            </Link>
            .
          </p>
        </div>
        <div className='flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center'>
          <button type='button' onClick={onReject} className='tf-btn-secondary px-4 py-2 text-sm'>
            Reject non-essential
          </button>
          <button type='button' onClick={onAccept} className='tf-btn-primary px-4 py-2 text-sm'>
            Accept all
          </button>
        </div>
      </div>
    </div>
  );
}
