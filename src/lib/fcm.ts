/** Saved item uses HTTP v1 credentials. */
export function isHttpV1SavedItem(item: Record<string, unknown> | null | undefined) {
  const data = (item?.value as Record<string, unknown>) ?? item;
  return Boolean(data?.projectID && data?.accessToken);
}

/** Legacy saves used Server Key only — cannot resend after Legacy removal. */
export function isLegacySavedItem(item: Record<string, unknown> | null | undefined) {
  const data = (item?.value as Record<string, unknown>) ?? item;
  return Boolean(data?.Serverkey || data?.http === false) && !isHttpV1SavedItem(item);
}

/** FCM HTTP v1 requires all `data` payload values to be strings. */
export function toFcmDataStrings(obj: Record<string, unknown>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) continue;
    result[key] = typeof val === 'string' ? val : JSON.stringify(val);
  }
  return result;
}
