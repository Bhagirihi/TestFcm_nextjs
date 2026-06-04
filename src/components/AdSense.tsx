import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';

import { ADSENSE_CLIENT_ID, isAdAllowedPath, isAdSenseEnabled } from '@/lib/adsense';
import { hasAnalyticsConsent } from '@/lib/cookie-consent';

declare global {
  interface Window {
    adsbygoogle: Record<string, unknown>[];
  }
}

type AdSenseProps = {
  slot: string;
  format?: 'auto' | 'rectangle' | 'horizontal' | 'vertical';
  className?: string;
  label?: string;
};

export default function AdSense({
  slot,
  format = 'auto',
  className = '',
  label = 'Advertisement',
}: AdSenseProps) {
  const router = useRouter();
  const pushed = useRef(false);
  const allowed = isAdAllowedPath(router.pathname);
  const [consentGranted, setConsentGranted] = useState(false);

  useEffect(() => {
    const syncConsent = () => setConsentGranted(hasAnalyticsConsent());
    syncConsent();
    window.addEventListener('cookie-consent-change', syncConsent);
    return () => window.removeEventListener('cookie-consent-change', syncConsent);
  }, []);

  useEffect(() => {
    if (!allowed || !isAdSenseEnabled || !slot || !consentGranted || pushed.current) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // AdSense not loaded yet or blocked by an ad blocker
    }
  }, [allowed, consentGranted, slot]);

  if (!allowed || !slot) return null;

  if (process.env.NODE_ENV !== 'production') {
    return (
      <div
        className={`rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center dark:border-slate-600 dark:bg-slate-800/50 ${className}`}
        aria-hidden='true'
      >
        <p className='text-xs font-medium text-slate-400 dark:text-slate-500'>{label}</p>
        <p className='mt-1 text-xs text-slate-400 dark:text-slate-500'>
          Slot {slot} — allowed on {router.pathname}
        </p>
      </div>
    );
  }

  if (!isAdSenseEnabled || !consentGranted) return null;

  return (
    <div className={className}>
      <p className='mb-2 text-center text-[10px] font-medium uppercase tracking-wider text-slate-400 dark:text-slate-500'>
        {label}
      </p>
      <ins
        className='adsbygoogle block min-h-[90px] overflow-hidden rounded-xl'
        style={{ display: 'block' }}
        data-ad-client={ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive='true'
      />
    </div>
  );
}
