import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import Example from '../pages/_localItem';
import {
  sendNotification,
  setInfo,
  setInfo2,
  setInfo3,
} from '../../redux/actions/main';

import Delete from '~/svg/Delete.svg';
import Email from '~/svg/Email.svg';
import Testnotification from '~/svg/Testnotification.svg';
import AdBanner from '@/components/AdBanner';
import {
  addDoc,
  arrayRemove,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
} from 'firebase/firestore';
import { firebaseDB } from '@/components/Initializetion';
import { getData, isuserLogin } from '@/lib/helper/firebaseHelper';

function EmailPage(props: any) {
  const { name3, setInfo3, sendNotification, user } = props;
  const [list, setlist] = useState([]);
  const [nothing, setnothing] = useState(false);

  useEffect(() => {
    async function fetchData() {
      await getNotifications();
    }
    fetchData();
  }, []);

  const getNotifications = async () => {
    const Login = await isuserLogin();
    if (!Login) {
      return setlist([]);
    }
    const docRef = doc(firebaseDB, 'users', user[0]?.uid);
    var notification = [];
    getData(docRef).then(async (data) => {
      console.log('Data', data);
      notification = data?.notifications;
      return await setlist(notification);
    });
  };

  const onClickTest = async (data: any) => {
    console.log('onClickTest', data.value);
    data = data.value;
    const FCMData = {
      serverkey: data.Serverkey,
      fcmtoken: data?.data?.to,
      body: data.data.notification.body,
      content_available: true,
      priority: 'high',
      title: data.data.notification.title,
      click_action: data.data.notification.click_action,
      image: data.data.notification.image,
      data: data?.data?.data,
    };
    console.log('FCM in Email', FCMData);
    await sendNotification(FCMData);
  };

  const onClickDel = async (data: any) => {
    const index = list.findIndex((i) => i.title == data.title);
    removeItemOnce(data, index);
  };

  async function removeItemOnce(arr: any, index: number) {
    var docRef = doc(firebaseDB, 'users', user[0]?.uid);
    // await deleteDoc(docRef, 'notifications', index);
    await updateDoc(docRef, {
      notifications: arrayRemove(arr), // removes "1" from the array
    });
    setInfo3(arr);
    setnothing(!nothing);
    return getNotifications();
  }
  console.log('list ---------', list == undefined && getNotifications());
  return (
    <div className='flex flex-col items-center justify-center'>
      {list == undefined || list.length == 0 ? (
        <>
          <Email className='h-5/6  w-7/12' width='60%' height='0' />
          <h2 className='p-8 text-4xl font-bold leading-relaxed'>
            Simple interface to Test Mobile Push Notification
          </h2>
        </>
      ) : (
        <div className='w-full rounded-lg  border bg-white p-2 shadow-md dark:border-gray-700 dark:bg-gray-800 sm:p-8'>
          <div className='mb-4 flex items-center justify-between'>
            <h3 className='font-bold leading-none text-gray-900 dark:text-white'>
              Saved Notification(s)
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
                console.log('D', d);
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
                                {d?.title.charAt(0)}
                              </h3>
                            </div>
                            <div className='flex-1 '>
                              <p className='text-md truncate font-medium text-gray-900 dark:text-white'>
                                {d?.title || 'Notification Title'}
                              </p>
                              <p className='truncate text-sm text-gray-500 dark:text-gray-400'>
                                {d?.value?.data?.notification?.title ||
                                  'Item saved name'}
                              </p>
                            </div>
                            <div
                              onClick={() => onClickDel(d)}
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
    user: state.main.user,
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
    sendNotification: (data: any) => dispatch(sendNotification(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EmailPage);
