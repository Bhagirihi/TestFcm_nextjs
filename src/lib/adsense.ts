export const ADSENSE_CLIENT_ID =
  process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID || 'ca-pub-5363029561384244';

export const ADSENSE_SLOTS = {
  home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME || '',
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR || '',
  contact: process.env.NEXT_PUBLIC_ADSENSE_SLOT_CONTACT || '',
} as const;

export const isAdSenseEnabled =
  process.env.NODE_ENV === 'production' &&
  Boolean(ADSENSE_CLIENT_ID && Object.values(ADSENSE_SLOTS).some(Boolean));

/** Routes where Google ads are allowed (content-rich pages only). */
export function isAdAllowedPath(pathname: string): boolean {
  if (!pathname) return false;
  if (pathname === '/privacy' || pathname === '/terms' || pathname === '/contactus' || pathname === '/404') return false;
  if (pathname === '/docs' || pathname.startsWith('/docs/')) return true;
  if (pathname === '/about' || pathname === '/faq' || pathname === '/') return true;
  return false;
}
