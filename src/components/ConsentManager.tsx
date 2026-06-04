import Script from 'next/script';
import { useEffect, useState } from 'react';

import CookieConsent from '@/components/CookieConsent';
import { ADSENSE_CLIENT_ID } from '@/lib/adsense';
import { getStoredConsent, setStoredConsent, type CookieConsentValue } from '@/lib/cookie-consent';

const GA_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

export default function ConsentManager() {
  const [consent, setConsent] = useState<CookieConsentValue | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setConsent(getStoredConsent());
    setMounted(true);

    const syncConsent = () => setConsent(getStoredConsent());
    window.addEventListener('cookie-consent-change', syncConsent);
    return () => window.removeEventListener('cookie-consent-change', syncConsent);
  }, []);

  const handleAccept = () => {
    setStoredConsent('accepted');
    setConsent('accepted');
  };

  const handleReject = () => {
    setStoredConsent('rejected');
    setConsent('rejected');
  };

  const showBanner = mounted && consent === null;
  const allowTracking = consent === 'accepted';

  return (
    <>
      {allowTracking && GA_ID && (
        <>
          <Script
            id='GOOGLE_ANALYTICS_ID'
            strategy='lazyOnload'
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          />
          <Script id='GOOGLE_ANALYTICS_SCRIPT' strategy='lazyOnload'>
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
              });
            `}
          </Script>
        </>
      )}

      {allowTracking && process.env.NODE_ENV === 'production' && (
        <Script
          id='adsense-script'
          strategy='lazyOnload'
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin='anonymous'
        />
      )}

      {showBanner && <CookieConsent onAccept={handleAccept} onReject={handleReject} />}
    </>
  );
}
