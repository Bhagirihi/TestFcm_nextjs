import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { Error } from '@/components/toast';

import { sendNotification, setInfo, setInfo2 } from '../../redux/actions/main';
import { toast } from 'react-toastify';

function HomePage(props: any) {
  const [query, setQuery] = useState({
    https: false,
    projectID: '',
    accessToken: '',
    serverkey: '',
    fcmtoken: '',
    title: '',
    body: '',
    redirect: '',
    image: '',
    data: '',
  });
  const [showResults, setShowResults] = useState<boolean>(true);
  const [disable, setDisable] = useState<boolean>(true);
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [deviceType, setDeviceType] = useState<string>('Desktop');
  const { setInfo, setInfo2, sendNotification, user } = props;

  const onClick = () => setShowResults(!showResults);
  useEffect(() => {
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(navigator.userAgent)) {
      setShowResults(false);
      setDeviceType('Mobile');
    } else {
      setDeviceType('Desktop');
      setShowResults(true);
    }
  }, [deviceType]);
  // Update inputs value
  const handleParam = () => async (e: any) => {
    const { name, value, type, checked } = e.target;
    console.log(name, value, type, checked);
    setQuery((prevState) => ({
      ...prevState,
      // [name]: value,
      [name]: type === 'checkbox' ? checked : value,
    }));
    if (name == 'data') {
      validateJson(value);
      value.length == 0 && setIsValid(true);
    }
    console.log('-------- qu', query);
    if (checked && query.projectID && query.accessToken && query.body && query.fcmtoken && query.title) {
      setDisable(false);
    } else if (query.serverkey && query.body && query.fcmtoken && query.title) {
      setDisable(false);
    }
  };

  //Local save
  const savelocal = async (e: any) => {
    console.log('-------------------------------------');
    e.preventDefault();

    const { fcmtoken, serverkey, body, title, data, image, redirect, projectID, accessToken, https } = query;
    let localItem = {};
    validateJson(data);
    if (!isValid) {
      return await toast.error(`Oops !! Please check your filled data.`, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    const FCMData = {
      to: fcmtoken,
      notification: {
        body: body,
        content_available: true,
        priority: 'high',
        title: title,
        click_action: redirect == undefined ? '' : redirect,
        image: image == undefined ? '' : image,
      },
      data: data,
    };
    if (https) {
      if (
        projectID == undefined ||
        accessToken == undefined ||
        body == undefined ||
        fcmtoken == undefined ||
        title == undefined
      ) {
        return Error('All Field with "*" are required');
      } else {
        localItem = {
          http: https,
          data: FCMData,
          projectID: projectID,
          accessToken: accessToken,
        };
      }
    } else {
      if (serverkey == undefined || body == undefined || fcmtoken == undefined || title == undefined) {
        return Error('All Field with "*" are required');
      } else {
        localItem = {
          http: https,
          data: FCMData,
          Serverkey: serverkey,
        };
      }
    }

    //window.localStorage.setItem('localItems', JSON.stringify(localItem));

    await setInfo(localItem);
    await setInfo2(true);
  };
  // Form Submit function
  const validateJson = (jsonInput: any) => {
    if (jsonInput.trim() === '') {
      setMessage('Valid JSON (Empty input is considered valid).');
      setIsValid(true);
      return;
    }

    try {
      JSON.parse(jsonInput);
      setMessage('Valid JSON!');
      setIsValid(true);
    } catch (error) {
      setMessage(`Invalid JSON: ${error.message}`);
      setIsValid(false);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    console.log('------', query);
    validateJson(query?.data);
    if (isValid) {
      sendNotification(query);
    } else {
      await toast.error(`Oops !! Please check your filled data.`, {
        position: 'top-left',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    // Display the form entries in the console
    //  console.log(formEntries);
  };
  return (
    <form id='pushNotification' className='mx-auto w-full rounded-lg border p-5' onSubmit={handleSubmit}>
      <div className='text-start '>
        <div>
          <label htmlFor='default-input' className='mb-5 inline-flex cursor-pointer items-center'>
            <input
              type='checkbox'
              id='default-input'
              placeholder='http'
              className='peer sr-only'
              onChange={handleParam()}
              name='https'
              value={query.https}
            />
            <div className="after:start-[2px] peer relative mx-3 h-5 w-9 rounded-full bg-gray-200 after:absolute after:top-[2px] after:h-4 after:w-4 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-yellow-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rtl:peer-checked:after:-translate-x-full dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            <span className='ms-3 text-sm font-medium text-gray-900 dark:text-gray-300'>HTTP V1</span>
          </label>

          {query.https ? (
            <>
              <div className='mb-3'>
                <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
                  Project ID
                </label>
                <input
                  type='text'
                  id='default-input'
                  placeholder='Project ID'
                  className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
                  required
                  onChange={handleParam()}
                  name='projectID'
                />
              </div>
              <div className='mb-3'>
                <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
                  Access Token
                </label>
                <input
                  type='text'
                  id='default-input'
                  placeholder='Access Token'
                  className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
                  required
                  onChange={handleParam()}
                  name='accessToken'
                />
              </div>
            </>
          ) : (
            <div className='mb-3'>
              <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
                Server Key
              </label>
              {/* <input
                type='text'
                id='default-input'
                placeholder='Server Key'
                className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
                required
                onChange={handleParam()}
                name='serverkey'
              /> */}
              <textarea
                className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50   '
                id='exampleFormControlTextarea1'
                placeholder='Server Key'
                required
                onChange={handleParam()}
                name='serverkey'
              />
            </div>
          )}
          <div className='mb-3'>
            <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
              FCM Registration Token (Device Token)
            </label>
            {/* <input
              type='text'
              id='default-input'
              placeholder='FCM Registration Token (Device Token)'
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
              required
              onChange={handleParam()}
              name='fcmtoken'
            /> */}
            <textarea
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50   '
              id='exampleFormControlTextarea1'
              placeholder='FCM Registration Token (Device Token)'
              required
              name='fcmtoken'
              onChange={handleParam()}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
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
            <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
              Message
            </label>
            <textarea
              className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50   '
              id='exampleFormControlTextarea1'
              placeholder='Notification Message'
              required
              name='body'
              onChange={handleParam()}
            ></textarea>
          </div>
        </div>
        <div className='m-4 text-center text-sm font-bold text-buttonh dark:text-buttonhd' onClick={onClick}>
          {showResults ? `No Need Option` : `what's new?`}
        </div>
        {showResults && (
          <div>
            <div className='mb-3'>
              <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
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
              <label htmlFor='default-input' className='mb-2 block text-sm font-medium'>
                Image URL - (optional)
              </label>
              <input
                type='url'
                id='default-input'
                placeholder='Image url'
                className='block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
                onChange={handleParam()}
                name='image'
              />
            </div>

            <div className='mb-3'>
              <label htmlFor='default-input' className={`mb-2 block text-sm font-medium `}>
                Data - (optional)
              </label>
              {query?.data.length > 0 && (
                <label
                  htmlFor='default-input'
                  className={`mb-2 block text-sm font-medium ${isValid ? 'text-green-900' : 'text-red-900'}`}
                >
                  {`${message && message}`}
                </label>
              )}
              <textarea
                rows='5'
                cols='50'
                value={query?.data}
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
        <div className='w-2/3   rounded-lg '>
          <button
            aria-label='send_notification'
            //  disabled={disable}
            className='w-full rounded-lg  bg-button bg-opacity-30 bg-opacity-60 p-2 text-lg font-medium text-white dark:bg-buttond dark:text-textd '
            type='submit'
          >
            Send Notification
          </button>
        </div>
        <div className='md:vis hidden  w-4 md:flex'></div>
        <div className='hidden w-1/3  rounded-lg md:flex '>
          <button
            aria-label='save_locally'
            disabled={disable}
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
  return {
    name: state.main.name,
    name2: state.main.name2,
    user: state.main.user,
  };
};

const mapDispatchToProps = (dispatch: any) => {
  return {
    setInfo: (data: any) => dispatch(setInfo(data)),
    setInfo2: (data: any) => dispatch(setInfo2(data)),
    sendNotification: (data: any) => dispatch(sendNotification(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
