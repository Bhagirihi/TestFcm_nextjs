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
