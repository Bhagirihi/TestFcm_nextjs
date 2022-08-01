import { useEffect, useState } from 'react';

export default function HomePage() {
  const [query, setQuery] = useState({});
  const [showResults, setShowResults] = useState<boolean>(true);
  const [deviceType, setDeviceType] = useState<string>("Desktop")

  const onClick = () => setShowResults(!showResults);
  useEffect(() => {
    if (
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
        navigator.userAgent
      )
    ) {
      setShowResults(false)
      setDeviceType("Mobile");

    } else {
      setDeviceType("Desktop");
      setShowResults(true)
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
      .then((res) => console.log(res))
      .catch((e) => alert(JSON.stringify(e)));
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
              className='block w-full rounded-lg border  dark:border-borderd dark:bg-darkl border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
              className='block w-full rounded-lg border  dark:border-borderd dark:bg-darkl border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
              className='block w-full rounded-lg border  dark:border-borderd dark:bg-darkl border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
              className='block w-full rounded-lg border  dark:border-borderd dark:bg-darkl border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500   '
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
                className='block w-full rounded-lg border dark:bg-darkl  dark:border-borderd border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                className='block w-full rounded-lg border dark:bg-darkl dark:border-borderd border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500'
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
                className='block w-full rounded-lg border dark:bg-darkl  dark:border-borderd border-gray-300  p-2.5 text-sm focus:border-blue-500 focus:ring-blue-500   '
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

      <div className="flex mb-4 content-center justify-center">
        <div className="w-2/3   rounded-lg " disabled>
          <button
            type='submit'
            className=' text-white dark:text-textd  w-full bg-opacity-30 bg-button dark:bg-buttond bg-opacity-60 text-lg font-medium p-2 rounded-lg '
          >
            Push Notification
          </button>
        </div>
        <div className='hidden md:flex  md:vis w-4'></div>
        <div className="hidden md:flex  w-1/3 rounded-lg "
          disabled>
          <button
            type='submit'
            className='text-buttonsl dark:text-buttonsd font-medium p-2 text-blue-300 dark:border-borderd border-blue-300 border-2 w-full cursor-not-allowed rounded-lg bg-transparent disabled:opacity-75'
          >
            Save Locally
          </button>
        </div>

      </div>

    </form>
  );
}
