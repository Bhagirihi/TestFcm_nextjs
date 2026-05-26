import { getAuth } from 'firebase/auth';
import { arrayRemove, doc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import AdSense from '@/components/AdSense';
import FcmSetupGuide from '@/components/FcmSetupGuide';
import SaveNotificationModal from '@/components/SaveNotificationModal';
import { firebaseDB } from '@/components/Initializetion';
import { Error } from '@/components/toast';
import { ADSENSE_SLOTS } from '@/lib/adsense';
import { isHttpV1SavedItem, isLegacySavedItem } from '@/lib/fcm';
import { getData, isEmpty, updateData } from '@/lib/helper/firebaseHelper';

import { sendNotification, setInfo3 } from '../../redux/actions/main';

import Delete from '~/svg/Delete.svg';
import Testnotification from '~/svg/Testnotification.svg';

function EmailView(props: {
  name3: unknown[];
  user: unknown[];
  setInfo3: (v: unknown[]) => void;
  sendNotification: (data: unknown) => Promise<boolean>;
}) {
  const { name3, setInfo3, sendNotification, user } = props;
  const [list, setList] = useState<unknown[]>([]);
  const [testingIdx, setTestingIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchNotification();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  useEffect(() => {
    setList(name3);
  }, [name3]);

  const fetchNotification = async () => {
    const isuser = getAuth().currentUser;
    const isData = await isEmpty(isuser);
    let listData = name3;

    if (!isData && isuser?.providerData[0]?.uid) {
      const rootRef = doc(firebaseDB, 'users', isuser.providerData[0].uid);
      getData(rootRef).then((data) => {
        const notification = data?.notifications;
        if (notification !== undefined) {
          setList(listData.concat(notification));
        }
      });
    } else {
      setList(listData);
    }
  };

  const onClickTest = async (data: Record<string, unknown>, idx: number) => {
    if (isLegacySavedItem(data)) {
      return Error('Legacy save — re-save with HTTP v1 credentials (Project ID + Access Token).');
    }

    const item = (data?.value as Record<string, unknown>) ?? data;
    const notification = item?.data as {
      to?: string;
      notification?: { body?: string; title?: string; click_action?: string; image?: string };
      data?: unknown;
    };

    setTestingIdx(idx);
    try {
      await sendNotification({
        fcmtoken: notification?.to,
        body: notification?.notification?.body,
        title: notification?.notification?.title,
        redirect: notification?.notification?.click_action,
        image: notification?.notification?.image,
        data: notification?.data,
        projectID: item?.projectID,
        accessToken: item?.accessToken,
      });
    } finally {
      setTestingIdx(null);
    }
  };

  const onClickDel = async (projectIdx: number) => {
    const arr = [...list];
    const isuser = getAuth().currentUser;
    const isData = await isEmpty(isuser);

    if (projectIdx > -1) {
      if (!isData && isuser?.providerData[0]?.uid) {
        const rootRef = doc(firebaseDB, 'users', isuser.providerData[0].uid);
        updateData(rootRef, { notifications: arrayRemove(arr[projectIdx]) });
      }
      arr.splice(projectIdx, 1);
    }

    setInfo3(arr);
    setList(arr);
  };

  const hasSavedItems = list.length > 0;

  return (
    <div className='flex h-full flex-col gap-6'>
      {hasSavedItems && (
        <div className='panel-card flex shrink-0 flex-col'>
          <div className='panel-header !mb-4'>
            <h3 className='panel-title'>Saved Notifications</h3>
            <p className='panel-subtitle'>
              {list.length} saved request{list.length !== 1 ? 's' : ''} — tap test to resend
            </p>
          </div>
          <div className='max-h-64 space-y-3 overflow-y-auto'>
            {list.map((d, idx) => {
              if (!d) return null;
              const item = d as Record<string, unknown>;
              const legacy = isLegacySavedItem(item);
              const canTest = isHttpV1SavedItem(item);

              return (
                <div className='saved-item' key={idx}>
                  <div className='flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-sm font-bold text-primary-700 dark:bg-primary-900/50 dark:text-primary-300'>
                    {(item?.title as string)?.charAt(0)?.toUpperCase() || 'N'}
                  </div>
                  <div className='min-w-0 flex-1'>
                    <p className='truncate text-sm font-semibold text-slate-900 dark:text-white'>
                      {(item?.title as string) || 'Notification Title'}
                    </p>
                    <p className='truncate text-xs text-slate-500 dark:text-slate-400'>
                      {((item?.data as { notification?: { title?: string } })?.notification?.title ||
                        (item?.value as { data?: { notification?: { title?: string } } })?.value?.data
                          ?.notification?.title ||
                        'Saved request') as string}
                    </p>
                    {legacy && (
                      <span className='mt-1 inline-block rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-amber-800 dark:bg-amber-900/40 dark:text-amber-300'>
                        Re-save required
                      </span>
                    )}
                  </div>
                  <button
                    type='button'
                    onClick={() => onClickTest(item, idx)}
                    disabled={!canTest || testingIdx === idx}
                    className='icon-btn-primary disabled:cursor-not-allowed disabled:opacity-40'
                    aria-label='Test notification'
                    title={legacy ? 'Legacy save — re-save with HTTP v1 credentials' : 'Resend notification'}
                  >
                    {testingIdx === idx ? (
                      <span className='inline-block h-5 w-5 animate-spin rounded-full border-2 border-primary-600 border-t-transparent' />
                    ) : (
                      <Testnotification className='h-5 w-5' />
                    )}
                  </button>
                  <button
                    type='button'
                    onClick={() => onClickDel(idx)}
                    className='icon-btn-danger'
                    aria-label='Delete notification'
                  >
                    <Delete className='h-5 w-5' />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <FcmSetupGuide />
      <AdSense slot={ADSENSE_SLOTS.sidebar} className='hidden lg:block' format='rectangle' />
      <SaveNotificationModal />
    </div>
  );
}

const mapStateToProps = (state: { main: { user: unknown[]; name: unknown; name2: boolean; name3: unknown[] } }) => ({
  user: state.main.user,
  name: state.main.name,
  name2: state.main.name2,
  name3: state.main.name3,
});

const mapDispatchToProps = (dispatch: (action: unknown) => unknown) => ({
  setInfo3: (data: unknown[]) => dispatch(setInfo3(data)),
  sendNotification: (data: unknown) => dispatch(sendNotification(data as Parameters<typeof sendNotification>[0])),
});

export default connect(mapStateToProps, mapDispatchToProps)(EmailView);
