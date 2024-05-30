import Link from 'next/link';
import { useState } from 'react';
import { connect } from 'react-redux';

function betawarning(props: any) {
  const [warnning, setWarnning] = useState(true);
  return (
    <div
      id='sticky-banner'
      tabindex='-1'
      className={` ${
        warnning ? '' : 'invisible'
      } start-0  fixed bottom-0 z-50 flex w-full justify-between border-b border-gray-200 bg-gray-50 p-4 dark:border-gray-600 dark:bg-gray-700`}
    >
      <div className='mx-auto flex items-center'>
        <p className='flex items-center text-sm font-normal text-gray-500 dark:text-gray-400'>
          <span className='me-3 mx-2 inline-flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gray-200 p-2 dark:bg-gray-600'>
            <svg
              className='h-3 w-3 text-gray-500 dark:text-gray-400 '
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              fill='currentColor'
              viewBox='0 0 18 19'
            >
              <path d='M15 1.943v12.114a1 1 0 0 1-1.581.814L8 11V5l5.419-3.871A1 1 0 0 1 15 1.943ZM7 4H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2v5a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2V4ZM4 17v-5h1v5H4ZM16 5.183v5.634a2.984 2.984 0 0 0 0-5.634Z' />
            </svg>
            <span className='sr-only'>Light bulb</span>
          </span>
          <span>
            We are in Development Mode for HTTP V1, Fond any Issue ?{' '}
            <a
              href='/contactus'
              className='decoration-600 dark:decoration-500 inline font-medium text-blue-600 underline decoration-solid underline-offset-2 hover:no-underline dark:text-blue-500'
            >
              Report Us
            </a>
          </span>
        </p>
      </div>
      <div className='flex items-center'>
        <button
          onClick={() => setWarnning(false)}
          data-dismiss-target='#sticky-banner'
          type='button'
          className='inline-flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-lg p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
        >
          <svg
            className='h-3 w-3'
            aria-hidden='true'
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 14 14'
          >
            <path
              stroke='currentColor'
              stroke-linecap='round'
              stroke-linejoin='round'
              stroke-width='2'
              d='m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6'
            />
          </svg>
          <span className='sr-only'>Close banner</span>
        </button>
      </div>
    </div>
  );
}
const mapStateToProps = (state: any) => {
  console.log('SATE REDUX', state);
  return {
    user: state.main.user,
  };
};

export default connect(mapStateToProps, [])(betawarning);
