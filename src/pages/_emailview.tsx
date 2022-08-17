import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Example from '../pages/_localItem';
import { sendNotification, setInfo, setInfo2, setInfo3 } from '../../redux/actions/main';

import Delete from '~/svg/Delete.svg';
import Email from '~/svg/Email.svg';
import Testnotification from '~/svg/Testnotification.svg';

function EmailPage(props: any) {
  const { name3, setInfo3, sendNotification } = props;
  const [list, setlist] = useState([]);
  const [nothing, setnothing] = useState(false);

  useEffect(() => {
    setlist(name3);
  }, [props]);

  const onClickTest = async (data: any) => {
    console.log('onClickTest', data);
    await sendNotification(data)
  };

  const onClickDel = async (idx: number) => {
    setlist(removeItemOnce(list, idx));
  };

  function removeItemOnce(arr: any, index: number) {
    if (index > -1) {
      arr.splice(index, 1);
    }
    setInfo3(arr);
    setnothing(!nothing);
    return arr;
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      {list.length == 0 || list == undefined ? (
        <>
          <Email className='h-5/6  w-7/12' width='60%' height='0' />
          <h1 className='p-8 text-4xl font-bold leading-relaxed'>
            Just a simple tool to test your firebase push notifications.
          </h1>
        </>
      ) : (
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

          <div>
            {list &&
              list.map(function (d, idx) {
                if (d) {
                  return (
                    <div className='flow-root'>
                      <ul
                        role='list'
                        className='divide-y divide-gray-200 dark:divide-gray-700'
                      >
                        <li className='py-3 sm:py-4'>
                          <div className='flex items-center space-x-4'>
                            <div className='flex h-11  w-11 flex-shrink-0 items-center justify-center rounded-full border-2 border-slate-400 dark:bg-slate-400'>
                              <h3 className='bold h-8 w-8 rounded-full '>
                                {d?.Notificationname.charAt(0)}
                              </h3>
                            </div>
                            <div className='flex-1 '>
                              <p className='text-md truncate font-medium text-gray-900 dark:text-white'>
                                {d?.Notificationname || 'Notification Title'}
                              </p>
                              <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                                {d?.data?.notification?.Title ||
                                  'Item saved name'}
                              </p>
                            </div>
                            <div
                              onClick={() => onClickDel(idx)}
                              className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'
                            >
                              <Delete className='flex h-8 w-8 items-center fill-current text-center' />
                            </div>
                            <div
                              onClick={() => onClickTest(d)}
                              className='inline-flex items-center text-base font-semibold text-gray-900 dark:text-white'
                            >
                              <Testnotification className='flex h-8 w-8 items-center fill-current text-center' />
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  );
                }
              })}
          </div>
        </div>
      )}
      <Example />
    </div>
  );
}
const mapStateToProps = (state: any) => {
  return {
    name: state.main.name,
    name2: state.main.name2,
    name3: state.main.name3,
  };
};


const mapDispatchToProps = (dispatch: any) => {
  return {
    setInfo: (data: any) => dispatch(setInfo(data)),
    setInfo2: (data: any) => dispatch(setInfo2(data)),
    setInfo3: (data: any) => dispatch(setInfo3(data)),
    sendNotification: (data: any) =>
      dispatch(
        sendNotification(data)
      )
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailPage);
