import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Error, Success } from '@/components/toast';

import { setInfo, setpopup } from '../../redux/actions/main';

function HomePage(props: any) {
  const [query, setQuery] = useState({});
  const [showResults, setShowResults] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(true);
  const [deviceType, setDeviceType] = useState<string>('Desktop');
  const { name, setInfo, setpopup } = props;
  console.log(name)
  const onClick = () => setShowResults(!showResults);
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setShowResults(false);
      setDeviceType('Mobile');
    } else {
      setDeviceType('Desktop');
      setShowResults(true);
    }
  }, [deviceType]);
  // Update inputs value
  const handleParam = () => (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuery((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    if (query.serverkey && query.body && query.fcmtoken && query.title) {
      setDisable(false);
    }
    console.log(disable, name)
  };

  //Local save
  const savelocal = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const { fcmtoken, serverkey, body, title, data } = query;
    console.log(
      '---------serverkey && body && fcmtoken && title',
      serverkey && body && fcmtoken && title
    );
    if (serverkey && body && fcmtoken && title == undefined) {
      return Error('Please giveus some Input.');
    }
    const FCMData = {
      to: fcmtoken,
      notification: {
        body: body,
        content_available: true,
        priority: 'high',
        Title: title,
      },
      data: data,
    };
    const localItem = {
      data: FCMData,
      Serverkey: serverkey,
    };
    //window.localStorage.setItem('localItems', JSON.stringify(localItem));
    await setInfo(localItem);
    await setpopup(true);
    await console.log('props on save local clcikc', props);
  };
  // Form Submit function
  const pushnotification = (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(query).forEach(([key, value]) => {
      formData.append(key, value);
    });
    const { fcmtoken, serverkey, body, title, data } = query;
    const FCMData = {
      to: fcmtoken,
      notification: {
        body: body,
        content_available: true,
        priority: 'high',
        Title: title,
      },
      data: data,
    };

    fetch('https://fcm.googleapis.com/fcm/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `key=${serverkey}`,
      },
      body: JSON.stringify(FCMData),
    })
      .then((res) => {
        res.status == '200'
          ? Success('Notificatio Send.')
          : Error('Could Not Send Notification.');
      })
      .catch((e) => {
        console.log('E', e), Error('Could Not Notificatio Send.');
      });
  };
  return (
    <form>
      <div className='text-start'>
        <div>
          <div className='mb-3'>
            <label
              htmlFor='default-input'
              className='mb-2 block text-sm font-medium'
            >
              Server Key
            </label>
            <input
              type='text'
              id='default-input'
              placeholder='Server Key'
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
              required
              onChange={handleParam()}
              name='serverkey'
            />
          </div>

          <div className='mb-3'>
            <label
              htmlFor='default-input'
              className='mb-2 block text-sm font-medium'
            >
              FCM Registration Token (Device Token)
            </label>
            <input
              type='text'
              id='default-input'
              placeholder='FCM Registration Token (Device Token)'
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
              required
              onChange={handleParam()}
              name='fcmtoken'
            />
          </div>

          <div className='mb-3'>
            <label
              htmlFor='default-input'
              className='mb-2 block text-sm font-medium'
            >
              Title
            </label>
            <input
              type='text'
              id='default-input'
              placeholder='Notification Title'
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
              required
              onChange={handleParam()}
              name='title'
            />
          </div>

          <div className='mb-3'>
            <label
              htmlFor='default-input'
              className='mb-2 block text-sm font-medium'
            >
              Body
            </label>
            <textarea
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50   '
              id='exampleFormControlTextarea1'
              placeholder='Notification body'
              required
              name='body'
              onChange={handleParam()}
            ></textarea>
          </div>
        </div>
        <div
          className='m-4 text-center text-sm font-bold text-buttonh dark:text-buttonhd'
          onClick={onClick}
        >
          {showResults ? 'Hide Optional' : 'Show Optional'}
        </div>
        {showResults && (
          <div>
            <div className='mb-3'>
              <label
                htmlFor='default-input'
                className='mb-2 block text-sm font-medium'
              >
                Click Action URL - (optional)
              </label>
              <input
                type='url'
                id='default-input'
                placeholder='URL to redirect'
                className='block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
                onChange={handleParam()}
                name='redirect'
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='default-input'
                className='mb-2 block text-sm font-medium'
              >
                Icon URL - (optional)
              </label>
              <input
                type='url'
                id='default-input'
                placeholder='Icor url'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
                onChange={handleParam()}
                name='icon'
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='default-input'
                className='mb-2 block text-sm font-medium'
              >
                Data - (optional)
              </label>
              <textarea
                className='block w-full rounded-lg border border-gray-300  p-2.5 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50   '
                id='exampleFormControlTextarea1'
                placeholder="Must be JSON Object like { 'key': 'value' }"
                name='data'
                onChange={handleParam()}
              ></textarea>
            </div>
          </div>
        )}
      </div>

      <div className='mb-4 flex content-center justify-center'>
        <div className='w-2/3   rounded-lg ' disabled>
          <button
            className=' w-full rounded-lg  bg-button bg-opacity-30 bg-opacity-60 p-2 text-lg font-medium text-white dark:bg-buttond dark:text-textd '
            onClick={pushnotification}
          >
            Push Notification
          </button>
        </div>
        <div className='md:vis hidden  w-4 md:flex'></div>
        <div className='hidden w-1/3  rounded-lg md:flex ' disabled>
          <button
            className='w-full  rounded-lg border-2 border-blue-300 bg-transparent p-2 font-medium text-buttonsl text-blue-300 disabled:opacity-75 dark:border-borderd dark:text-buttonsd'
            onClick={savelocal}
          >
            Save Locally
          </button>
        </div>
      </div>
    </form>
  );
}
const mapStateToProps = (state: any) => {
  return { name: state.main.name };
};

const mapDispatchToProps = {
  setInfo,
  setpopup,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
