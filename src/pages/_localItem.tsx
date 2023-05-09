import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import addData from '@/components/addData';
import { Error } from '@/components/toast';

import { setInfo2, setInfo3 } from '../../redux/actions/main';

function Example(props: any) {
  const { setInfo2, setInfo3, name2, name, name3, user } = props;
  const [isShown, setIsShown] = useState(false);
  const [savetoname3, Setsavetoname3] = useState(false);
  const [request, SetRequest] = useState({});

  useEffect(() => {
    setIsShown(name2);
    console.log('name 2', name2);
  }, [props]);

  useEffect(() => {
    const name3save = [
      ...name3,
      {
        data: name?.data,
        Serverkey: name?.Serverkey,
        Notificationname: request?.requestName,
      },
    ];

    if (savetoname3) {
      setInfo3(name3save);
    }
  }, [savetoname3]);

  const closeModal = () => {
    setIsShown(false);
    setInfo2(false);
  };
  const accept = async () => {
    if (!request.requestName) {
      return Error('Please giveus some Input.');
    }
    console.log('request', name, request.requestName, user[0].email);

    const { result, error } = await addData(
      user[0].email,
      'tokens',
      request.requestName,
      name
    );
    console.log(result, error, '0900');
    Setsavetoname3(true);
    await setInfo2(false);
    await setIsShown(false);
    Setsavetoname3(false);
  };

  const popupvalue = [
    {
      name: 'Server Key',
      value: name?.Serverkey,
    },
    {
      name: 'User Token',
      value: name?.data?.to,
    },
    {
      name: 'Title',
      value: name?.data?.notification?.title,
    },
    {
      name: 'Body',
      value: name?.data?.notification?.body,
    },
    {
      name: 'Click Url',
      value: name?.data?.notification?.redirect,
    },
    {
      name: 'Icon Url',
      value: name?.data?.notification?.image,
    },
    {
      name: 'Data',
      value: name?.data?.data,
    },
  ];

  const dynammicModalClass = () => (isShown ? { display: 'block' } : '');

  const handleParam = () => (e: any) => {
    const name = e.target.name;
    const value = e.target.value;
    SetRequest((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return isShown ? (
    <div className='modal' style={dynammicModalClass()} id='channelModal'>
      <div
        id='small-modal'
        className='h-modal fixed top-0 right-0 left-0 z-50 flex w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-opacity-25 md:inset-0 md:h-full'
        aria-modal='true'
        role='dialog'
      >
        <div className='relative h-full w-full max-w-md p-4 md:h-auto'>
          <div className='relative rounded-lg bg-white shadow dark:bg-popupbg'>
            <div className='flex items-center justify-between rounded-t p-5  dark:border-gray-600'>
              <h3 className='text-xl font-medium text-gray-900 dark:text-white'>
                Save Request
              </h3>
              <button
                type='button'
                onClick={closeModal}
                className='ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
                data-modal-toggle='small-modal'
              >
                <svg
                  aria-hidden='true'
                  className='h-5 w-5'
                  fill='currentColor'
                  viewBox='0 0 20 20'
                  xmlns='http://www.w3.org/2000/svg'
                >
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  ></path>
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <div className='space-y-1 p-3'>
              <div>
                <label
                  htmlFor='default-input'
                  className='mb-2 block flex items-start text-sm font-medium'
                >
                  Request Name
                </label>
                <input
                  type='text'
                  id='default-input'
                  autoFocus
                  className='block w-full rounded-lg border  border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-borderd dark:bg-darkl dark:text-slate-50'
                  required
                  onChange={handleParam()}
                  name='requestName'
                />
              </div>
              <div>
                <p className='p-1 text-sm leading-relaxed text-gray-500 dark:text-gray-400'></p>
              </div>

              <figure className='dark:highlight-white/5 justify-satrt relative flex flex-col-reverse items-start rounded-lg bg-slate-50 p-2 dark:bg-popupkeyfield'>
                <code>
                  {popupvalue.map((item, index) => {
                    const name = item.name;
                    const value = item.value;
                    const length = (value && value.length) || 0;
                    console.log('VALUE ---', value && value.length);
                    if (!value) {
                      return;
                    }
                    return (
                      <div
                        key={index}
                        className={`flex ${
                          length > 20 ? `flex-col` : `flex-row`
                        } break-all p-1 text-left`}
                      >
                        <label className='w-28 bg-popupkeyDark p-1 text-white dark:bg-popupkeybg dark:text-popupkey '>
                          {name}
                        </label>
                        {length > 20 ? (
                          <textarea
                            rows='2'
                            cols='10'
                            className='h-fit w-2/3 resize-none border border-popupkeyDark
                            dark:border-popupkeybg'
                            readOnly
                          >
                            {`${value.slice(0, 59)} ....`}
                          </textarea>
                        ) : (
                          <p className='mx-2 w-96 overflow-hidden truncate'>
                            {value}
                          </p>
                        )}
                        {/* <code className='mx-3 bg-popupkeyDark p-1 text-white dark:bg-popupkeybg dark:text-popupkey '>
                          {name}
                        </code>
                        <p className='overflow-hidden text-ellipsis'>{value}</p> */}
                      </div>
                    );
                  })}
                </code>
              </figure>
            </div>
            <div className='flex items-center space-x-2 rounded-b border-gray-200  p-6 dark:border-gray-600'>
              <button
                onClick={accept}
                data-modal-toggle='small-modal'
                type='button'
                className='rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'
              >
                I accept
              </button>
              <button
                data-modal-toggle='small-modal'
                onClick={closeModal}
                type='button'
                className='rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-500 hover:bg-gray-100 hover:text-gray-900 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-500 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white dark:focus:ring-gray-600'
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

const mapStateToProps = (state: any) => {
  return {
    name: state.main.name,
    name3: state.main.name3,
    name2: state.main.name2,
    user: state.main.user,
  };
};

const mapDispatchToProps = {
  setInfo2,
  setInfo3,
};

export default connect(mapStateToProps, mapDispatchToProps)(Example);
