import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

import { Error } from '@/components/toast';

import { sendNotification, setInfo, setInfo2 } from '../../redux/actions/main';

type QueryState = {
  projectID: string;
  accessToken: string;
  fcmtoken: string;
  title: string;
  body: string;
  redirect: string;
  image: string;
  data: string;
};

function NotificationField(props: {
  setInfo: (data: unknown) => void;
  setInfo2: (v: boolean) => void;
  sendNotification: (data: QueryState) => Promise<boolean>;
}) {
  const { setInfo, setInfo2, sendNotification } = props;

  const [query, setQuery] = useState<QueryState>({
    projectID: '',
    accessToken: '',
    fcmtoken: '',
    title: '',
    body: '',
    redirect: '',
    image: '',
    data: '',
  });
  const [showResults, setShowResults] = useState(true);
  const [disableSave, setDisableSave] = useState(true);
  const [sending, setSending] = useState(false);
  const [message, setMessage] = useState('');
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Windows Phone/i.test(
      navigator.userAgent
    );
    setShowResults(!mobile);
  }, []);

  useEffect(() => {
    const { projectID, accessToken, body, fcmtoken, title } = query;
    setDisableSave(!(projectID && accessToken && body && fcmtoken && title));
  }, [query]);

  const validateJson = (jsonInput: string | null = null) => {
    if (jsonInput === null || jsonInput === '') {
      setMessage('Valid JSON (Empty input is considered valid).');
      setIsValid(true);
      return true;
    }

    try {
      JSON.parse(jsonInput);
      setMessage('Valid JSON!');
      setIsValid(true);
      return true;
    } catch (error) {
      setMessage(`Invalid JSON: ${(error as Error).message}`);
      setIsValid(false);
      return false;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setQuery((prev) => ({ ...prev, [name]: value }));
    if (name === 'data') {
      validateJson(value);
    }
  };

  const showValidationToast = () =>
    toast.error('Oops !! Please check your filled data.', {
      position: 'top-left',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });

  const savelocal = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateJson(query.data)) {
      return showValidationToast();
    }

    const { fcmtoken, body, title, data, image, redirect, projectID, accessToken } = query;

    if (!projectID || !accessToken || !body || !fcmtoken || !title) {
      return Error('All required fields must be filled.');
    }

    const localItem = {
      data: {
        to: fcmtoken,
        notification: {
          body,
          content_available: true,
          priority: 'high',
          title,
          click_action: redirect || '',
          image: image || '',
        },
        data,
      },
      projectID,
      accessToken,
    };

    setInfo(localItem);
    setInfo2(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateJson(query.data)) {
      return showValidationToast();
    }

    setSending(true);
    try {
      await sendNotification(query);
    } finally {
      setSending(false);
    }
  };

  return (
    <form id='pushNotification' className='panel-card flex h-full flex-col' onSubmit={handleSubmit}>
      <div className='panel-header'>
        <div>
          <h2 className='panel-title'>Send Notification</h2>
          <p className='panel-subtitle'>Configure and dispatch your FCM push message via HTTP v1</p>
        </div>
      </div>

      <div className='flex-1 space-y-4 text-start'>
        <div>
          <label htmlFor='projectID-input' className='tf-label'>
            Project ID
          </label>
          <input
            type='text'
            id='projectID-input'
            placeholder='Project ID'
            className='tf-input'
            required
            onChange={handleChange}
            name='projectID'
            value={query.projectID}
          />
        </div>

        <div>
          <label htmlFor='accessToken-input' className='tf-label'>
            Access Token <span className='font-normal text-slate-400'>(OAuth — not device token)</span>
          </label>
          <input
            type='text'
            id='accessToken-input'
            placeholder='ya29.xxxx… from: gcloud auth print-access-token'
            className='tf-input font-mono text-xs'
            required
            onChange={handleChange}
            name='accessToken'
            value={query.accessToken}
          />
          <p className='mt-1.5 text-xs text-slate-500 dark:text-slate-400'>
            Must start with ya29. — do not paste APA91… here (that belongs in Device Token).
          </p>
        </div>

        <div>
          <label htmlFor='fcmtoken-input' className='tf-label'>
            FCM Registration Token (Device Token)
          </label>
          <textarea
            className='tf-input min-h-[80px] font-mono text-xs'
            id='fcmtoken-input'
            placeholder='FCM Registration Token (Device Token)'
            required
            name='fcmtoken'
            onChange={handleChange}
            value={query.fcmtoken}
          />
        </div>

        <div>
          <label htmlFor='title-input' className='tf-label'>
            Title
          </label>
          <input
            type='text'
            id='title-input'
            placeholder='Notification Title'
            className='tf-input'
            required
            onChange={handleChange}
            name='title'
            value={query.title}
          />
        </div>

        <div>
          <label htmlFor='body-input' className='tf-label'>
            Message
          </label>
          <textarea
            className='tf-input min-h-[88px]'
            id='body-input'
            placeholder='Notification Message'
            required
            name='body'
            onChange={handleChange}
            value={query.body}
          />
        </div>

        <button
          type='button'
          className='w-full rounded-lg py-2 text-center text-xs font-semibold text-primary-600 transition hover:bg-primary-50 dark:text-primary-400 dark:hover:bg-primary-900/30'
          onClick={() => setShowResults(!showResults)}
        >
          {showResults ? 'Hide optional fields' : 'Show optional fields'}
        </button>

        {showResults && (
          <div className='space-y-4 rounded-xl border border-dashed border-slate-200 p-4 dark:border-slate-700'>
            <div>
              <label htmlFor='redirect-input' className='tf-label'>
                Click Action URL - (optional)
              </label>
              <input
                type='url'
                id='redirect-input'
                placeholder='URL to redirect'
                className='tf-input'
                onChange={handleChange}
                name='redirect'
                value={query.redirect}
              />
            </div>

            <div>
              <label htmlFor='image-input' className='tf-label'>
                Image URL - (optional)
              </label>
              <input
                type='url'
                id='image-input'
                placeholder='Image url'
                className='tf-input'
                onChange={handleChange}
                name='image'
                value={query.image}
              />
            </div>

            <div>
              <label htmlFor='data-input' className='tf-label'>
                Data - (optional)
              </label>
              {query.data !== '' && message && (
                <p className={`mb-2 text-xs font-medium ${isValid ? 'text-emerald-600' : 'text-red-500'}`}>
                  {message}
                </p>
              )}
              <textarea
                rows={5}
                value={query.data}
                className='tf-input font-mono text-xs'
                id='data-input'
                placeholder='Must be JSON Object like { "Sender": "https://www.testfcm.in/" }'
                name='data'
                onChange={handleChange}
              />
            </div>
          </div>
        )}
      </div>

      <div className='mt-6 flex flex-col gap-3 border-t border-slate-200 pt-6 dark:border-slate-700 sm:flex-row'>
        <button
          aria-label='send_notification'
          className='tf-btn-primary flex items-center justify-center gap-2 sm:flex-[2]'
          type='submit'
          disabled={sending}
        >
          {sending && (
            <span className='inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent' />
          )}
          {sending ? 'Sending…' : 'Send Notification'}
        </button>
        <button
          aria-label='save_locally'
          disabled={disableSave}
          className='tf-btn-secondary hidden sm:flex sm:flex-1'
          onClick={savelocal}
          type='button'
        >
          Save Locally
        </button>
      </div>
    </form>
  );
}

const mapDispatchToProps = (dispatch: (action: unknown) => unknown) => ({
  setInfo: (data: unknown) => dispatch(setInfo(data)),
  setInfo2: (data: boolean) => dispatch(setInfo2(data)),
  sendNotification: (data: QueryState) => dispatch(sendNotification(data)),
});

export default connect(null, mapDispatchToProps)(NotificationField);
