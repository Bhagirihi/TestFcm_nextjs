import { useEffect, useState } from 'react';

import { Error, Success } from '@/components/toast';

export default function HomePage() {
  const [query, setQuery] = useState({});
  const [showResults, setShowResults] = useState<boolean>(true);
  const [deviceType, setDeviceType] = useState<string>('Desktop');

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
  };
  // Form Submit function
  const formSubmit = (e: any) => {
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
        const newLocal = res.status;
        newLocal == '200'
          ? (Success('Notificatio Send.'))
          : (Error('Could Not Send Notification.'))
      })
      .catch((e) => {
        console.log('E', e), Error('Could Not Notificatio Send.');
      });
  };
  return (
    <form onSubmit={formSubmit}>
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
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl'
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
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl'
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
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl'
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
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl   '
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
                className='block w-full rounded-lg border border-gray-300  bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl'
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
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl'
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
                className='block w-full rounded-lg border border-gray-300  p-2.5 text-sm  focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl   '
                id='exampleFormControlTextarea1'
                placeholder="Must be JSON Object like { 'key': 'value' }"
                name='data'
                onChange={handleParam()}
              ></textarea>
            </div>
          </div>
        )}
      </div>

      {/* <button
          type='submit'
          className='mr-4 rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 sm:w-full md:w-80'
        >
          Push Notification
        </button>

        <button
          type='submit'
          className='hidden md:flex rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  md:w-36'
        >
          Save Locally
        </button> */}

      <div className='mb-4 flex content-center justify-center'>
        <div className='w-2/3   rounded-lg ' disabled>
          <button
            type='submit'
            className=' w-full rounded-lg  bg-button bg-opacity-30 bg-opacity-60 p-2 text-lg font-medium text-white dark:bg-buttond dark:text-textd '
          >
            Push Notification
          </button>
        </div>
        <div className='md:vis hidden  w-4 md:flex'></div>
        <div className='hidden w-1/3  rounded-lg md:flex ' disabled>
          <button
            type='submit'
            className='w-full cursor-not-allowed rounded-lg border-2 border-blue-300 bg-transparent p-2 font-medium text-buttonsl text-blue-300 disabled:opacity-75 dark:border-borderd dark:text-buttonsd'
          >
            Save Locally
          </button>
        </div>
      </div>
    </form>
  );
}
