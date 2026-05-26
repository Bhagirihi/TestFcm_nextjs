import { getAuth } from 'firebase/auth';
import { arrayUnion, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { firebaseDB } from '@/components/Initializetion';
import { Error } from '@/components/toast';
import { isEmpty, updateData } from '@/lib/helper/firebaseHelper';

import { setInfo2, setInfo3 } from '../../redux/actions/main';

type SaveRequest = { requestName?: string };

function SaveNotificationModal(props: {
  name: Record<string, unknown>;
  name2: boolean;
  name3: unknown[];
  user: unknown[];
  setInfo2: (v: boolean) => void;
  setInfo3: (v: unknown[]) => void;
}) {
  const { setInfo2, setInfo3, name2, name, name3 } = props;
  const [isShown, setIsShown] = useState(false);
  const [savePending, setSavePending] = useState(false);
  const [request, setRequest] = useState<SaveRequest>({});

  useEffect(() => {
    setIsShown(name2);
  }, [name2]);

  useEffect(() => {
    if (!savePending) return;

    const name3save = [
      ...name3,
      {
        projectID: name?.projectID,
        accessToken: name?.accessToken,
        data: name?.data,
        title: request?.requestName,
      },
    ];
    setInfo3(name3save);
    setSavePending(false);
  }, [savePending, name, name3, request?.requestName, setInfo3]);

  const closeModal = () => {
    setIsShown(false);
    setInfo2(false);
  };

  const accept = async () => {
    if (!request.requestName) {
      return Error('Please give us a name for this request.');
    }

    const isuser = getAuth().currentUser;
    const isData = await isEmpty(isuser);

    if (!isData && isuser?.providerData[0]?.uid) {
      const rootRef = doc(firebaseDB, 'users', isuser.providerData[0].uid);
      updateData(rootRef, {
        notifications: arrayUnion({ title: request.requestName, value: name }),
      });
    }

    setSavePending(true);
    setInfo2(false);
    setIsShown(false);
  };

  const popupFields = [
    { name: 'Project ID', value: name?.projectID },
    { name: 'Access Token', value: name?.accessToken },
    { name: 'User Token', value: (name?.data as { to?: string })?.to },
    { name: 'Title', value: (name?.data as { notification?: { title?: string } })?.notification?.title },
    { name: 'Body', value: (name?.data as { notification?: { body?: string } })?.notification?.body },
    { name: 'Click Url', value: (name?.data as { notification?: { redirect?: string } })?.notification?.redirect },
    { name: 'Icon Url', value: (name?.data as { notification?: { image?: string } })?.notification?.image },
    { name: 'Data', value: (name?.data as { data?: unknown })?.data },
  ];

  if (!isShown) return null;

  return (
    <div className='modal' style={{ display: 'block' }} id='channelModal'>
      <div
        className='fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/60 p-4 backdrop-blur-sm'
        aria-modal='true'
        role='dialog'
      >
        <div className='relative h-full w-full max-w-md p-4 md:h-auto'>
          <div className='relative rounded-lg bg-white shadow dark:bg-popupbg'>
            <div className='flex items-center justify-between rounded-t p-5 dark:border-gray-600'>
              <h3 className='text-xl font-medium text-gray-900 dark:text-white'>Save Request</h3>
              <button aria-label='modal_close' type='button' onClick={closeModal} className='icon-btn'>
                <svg aria-hidden='true' className='h-5 w-5' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                    clipRule='evenodd'
                  />
                </svg>
                <span className='sr-only'>Close modal</span>
              </button>
            </div>

            <div className='space-y-4 p-6'>
              <div>
                <label htmlFor='requestName-input' className='tf-label'>
                  Request Name
                </label>
                <input
                  type='text'
                  id='requestName-input'
                  autoFocus
                  className='tf-input'
                  required
                  onChange={(e) => setRequest({ requestName: e.target.value })}
                  name='requestName'
                />
              </div>

              <figure className='rounded-xl border border-slate-200 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-800/50'>
                {popupFields.map((item, index) => {
                  if (!item.value) return null;
                  return (
                    <div key={index} className='flex break-all p-1 text-left'>
                      <article>
                        <h4 className='bg-popupkeyDark p-1 dark:bg-popupkeybg'>{item.name}</h4>
                        <p className='overflow-hidden text-ellipsis line-clamp-2 hover:line-clamp-none'>{String(item.value)}</p>
                      </article>
                    </div>
                  );
                })}
              </figure>
            </div>

            <div className='flex items-center gap-3 border-t border-slate-200 px-6 py-4 dark:border-slate-700'>
              <button type='button' onClick={accept} className='tf-btn-primary !w-auto px-6'>
                Save
              </button>
              <button type='button' onClick={closeModal} className='tf-btn-secondary !w-auto px-6'>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: { main: { name: unknown; name3: unknown[]; name2: boolean; user: unknown[] } }) => ({
  name: state.main.name,
  name3: state.main.name3,
  name2: state.main.name2,
  user: state.main.user,
});

export default connect(mapStateToProps, { setInfo2, setInfo3 })(SaveNotificationModal);
