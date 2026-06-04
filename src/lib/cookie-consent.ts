export const COOKIE_CONSENT_KEY = 'testfcm-cookie-consent';

export type CookieConsentValue = 'accepted' | 'rejected';

export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === 'undefined') return null;
  const value = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (value === 'accepted' || value === 'rejected') return value;
  return null;
}

export function setStoredConsent(value: CookieConsentValue) {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event('cookie-consent-change'));
}

export function hasAnalyticsConsent(): boolean {
  return getStoredConsent() === 'accepted';
}
