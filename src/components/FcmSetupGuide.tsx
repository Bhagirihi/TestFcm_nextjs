type GuideStep = {
  id: string;
  title: string;
  field: string;
  summary: string;
  steps: string[];
  link?: { href: string; label: string };
  note?: string;
};

const httpV1Steps: GuideStep[] = [
  {
    id: 'project-id',
    title: 'Project ID',
    field: 'Project ID',
    summary: 'Your Firebase project identifier.',
    steps: [
      'Open Firebase Console → select your project.',
      'Click the gear icon → Project settings.',
      'Copy the value under General → Project ID.',
    ],
    link: { href: 'https://console.firebase.google.com/', label: 'Open Firebase Console' },
  },
  {
    id: 'access-token',
    title: 'Access Token (OAuth 2.0)',
    field: 'Access Token',
    summary: 'OAuth 2.0 token from gcloud — NOT the FCM device token.',
    steps: [
      'This is NOT your FCM registration / device token (never paste APA91… here).',
      'Install Google Cloud SDK, then run: gcloud auth login',
      'Run: gcloud auth application-default login',
      'Run: gcloud auth print-access-token',
      'Copy the token — it usually starts with ya29. — and paste into Access Token.',
    ],
    link: {
      href: 'https://cloud.google.com/sdk/gcloud/reference/auth/application-default/print-access-token',
      label: 'gcloud token docs',
    },
    note: 'Access Token ≠ Device Token. Device token goes in the FCM Registration Token field only.',
  },
  {
    id: 'device-token',
    title: 'FCM Registration Token',
    field: 'Device Token',
    summary: 'Unique token for the device or app instance that should receive the push.',
    steps: [
      'In your Android/iOS/Web app, call Firebase Messaging getToken().',
      'Log or copy the token from app debug output.',
      'Paste the full token into the form on the right.',
    ],
    link: {
      href: 'https://firebase.google.com/docs/cloud-messaging/get-token',
      label: 'How to get FCM token',
    },
  },
  {
    id: 'payload',
    title: 'Title & Message',
    field: 'Title / Message',
    summary: 'The notification text your user will see on the device.',
    steps: [
      'Enter a short Title (e.g. "Test notification").',
      'Enter the Message body shown in the notification tray.',
      'Optional: add Click Action URL, Image URL, or JSON Data payload.',
    ],
  },
  {
    id: 'send',
    title: 'Send & Save',
    field: 'Send Notification',
    summary: 'Dispatch the push and optionally store the request for later.',
    steps: [
      'Click Send Notification — your app calls our server, which forwards to FCM (avoids browser CORS).',
      'Use Save Locally to store the request and re-test from the list above.',
      'Sign in with Google to sync saved requests across devices.',
    ],
  },
];

function StepCard({ step, index }: { step: GuideStep; index: number }) {
  return (
    <li className='guide-step'>
      <span className='guide-step-number'>{index + 1}</span>
      <div className='min-w-0 flex-1'>
        <div className='flex flex-wrap items-center gap-2'>
          <h4 className='text-sm font-semibold text-slate-900 dark:text-white'>{step.title}</h4>
          <span className='guide-field-tag'>→ {step.field}</span>
        </div>
        <p className='mt-1 text-xs text-slate-500 dark:text-slate-400'>{step.summary}</p>
        <ol className='mt-2 space-y-1'>
          {step.steps.map((line) => (
            <li key={line} className='guide-step-line'>
              {line}
            </li>
          ))}
        </ol>
        {step.note && <p className='mt-2 text-xs text-amber-700 dark:text-amber-400'>{step.note}</p>}
        {step.link && (
          <a
            href={step.link.href}
            target='_blank'
            rel='noopener noreferrer'
            className='mt-2 inline-flex text-xs font-medium text-primary-600 hover:underline dark:text-primary-400'
          >
            {step.link.label} ↗
          </a>
        )}
      </div>
    </li>
  );
}

export default function FcmSetupGuide() {
  return (
    <div className='panel-card flex flex-col'>
      <div className='panel-header !mb-4'>
        <span className='tf-badge mb-2'>Setup guide</span>
        <h2 className='panel-title'>How to get each field</h2>
        <p className='panel-subtitle'>
          Follow these steps, then paste values into the form on the right. TestFCM uses FCM HTTP v1 only.
        </p>
      </div>

      <ul className='space-y-4'>
        {httpV1Steps.map((step, index) => (
          <StepCard key={step.id} step={step} index={index} />
        ))}
      </ul>

      <p className='mt-5 border-t border-slate-200 pt-4 text-center text-xs text-slate-400 dark:border-slate-700 dark:text-slate-500'>
        Built by{' '}
        <a href='https://www.dhruvdave.in/' className='text-primary-600 hover:underline dark:text-primary-400'>
          dhruvdave.in
        </a>
      </p>
    </div>
  );
}
