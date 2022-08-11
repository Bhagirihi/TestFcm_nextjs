import { useState } from 'react';
import { connect } from 'react-redux';

import Example from '../pages/_localItem';
import { setInfo, setpopup } from '../../redux/actions/main';

import Delete from '~/svg/Delete.svg';
import Email from '~/svg/Email.svg';
import Testnotification from '~/svg/Testnotification.svg';

function EmailPage(props: any) {
  const { name, setInfo, setpopup } = props;
  const [data, setdata] = useState('');
  // useEffect(() => {
  //   const data = console.log("DATa ----------", props,)

  // }, [props])
  const str = 'John Wick';
  const firstChar = str.charAt(0);

  return (
    <div className='flex flex-col items-center justify-center'>
      <Email className='h-5/6  w-7/12' width='60%' height='0' />
      <h1 className='p-8 text-4xl font-bold leading-relaxed'>
        Just a simple tool to test your firebase push notifications.
      </h1>
      <Example />

      <div className='w-full rounded-lg  border bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8'>
        <div className='mb-4 flex items-center justify-between'>
          <h3 className='font-bold leading-none text-gray-900 dark:text-white'>
            Saved Requests
          </h3>
          <a
            href='#'
            className='text-sm font-medium text-blue-600 hover:underline dark:text-blue-500'
          >
            View all
          </a>
        </div>
        <div className='flow-root'>
          <ul
            role='list'
            className='divide-y divide-gray-200 dark:divide-gray-700'
          >
            <li className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex h-11  w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-400 dark:bg-slate-400'>
                  <h3 className='bold h-8 w-8 rounded-full '>{firstChar}</h3>
                </div>
                <div className='flex-1 '>
                  <p className='text-md truncate font-medium text-gray-900 dark:text-white'>
                    Item saved name
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    Notification Title
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  <Delete className='flex h-8 w-8 items-center fill-current text-center' />
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  <Testnotification className='flex h-8 w-8 items-center fill-current text-center' />
                </div>
              </div>
            </li>
            <li className='py-3 sm:py-4'>
              <div className='flex items-center space-x-4'>
                <div className='flex h-11  w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-400 dark:bg-slate-400'>
                  <h3 className='bold h-8 w-8 rounded-full '>{firstChar}</h3>
                </div>
                <div className='flex-1 '>
                  <p className='text-md truncate font-medium text-gray-900 dark:text-white'>
                    Item saved name
                  </p>
                  <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                    Notification Title
                  </p>
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  <Delete className='flex h-8 w-8 items-center fill-current text-center' />
                </div>
                <div className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'>
                  <Testnotification className='flex h-8 w-8 items-center fill-current text-center' />
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state: any) => {
  return { name: state.main.name };
};

const mapDispatchToProps = {
  setInfo,
  setpopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailPage);
