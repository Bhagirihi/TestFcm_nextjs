import { isHttpV1SavedItem, isLegacySavedItem, toFcmDataStrings } from '@/lib/fcm';

describe('saved-item classification (token-less saves)', () => {
  it('treats a projectID-only save as an HTTP v1 template, not legacy', () => {
    const item = { projectID: 'my-project-123', data: { to: 'device-token' } };
    expect(isHttpV1SavedItem(item)).toBe(true);
    expect(isLegacySavedItem(item)).toBe(false);
  });

  it('treats a Firestore-shaped save (value.projectID) as HTTP v1', () => {
    const item = { title: 'Test', value: { projectID: 'my-project-123', data: {} } };
    expect(isHttpV1SavedItem(item)).toBe(true);
  });

  it('still flags a Server Key-only save as legacy', () => {
    const item = { Serverkey: 'AAA-old-key' };
    expect(isLegacySavedItem(item)).toBe(true);
    expect(isHttpV1SavedItem(item)).toBe(false);
  });
});

describe('toFcmDataStrings', () => {
  it('stringifies non-string values and drops null/undefined', () => {
    expect(toFcmDataStrings({ a: 1, b: true, c: null, d: undefined, e: 'x' })).toEqual({
      a: '1',
      b: 'true',
      e: 'x',
    });
  });
});
