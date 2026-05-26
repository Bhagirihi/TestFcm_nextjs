import { Error, Success } from '@/components/toast';
import logger from '@/lib/logger';
import { toFcmDataStrings } from '@/lib/fcm';

import * as t from '../types';

function saveToLocalStorage(value: unknown, name: string) {
  try {
    window.localStorage.setItem(name, JSON.stringify(value));
  } catch (e) {
    logger(e, 'localStorage save failed');
  }
}

export const setInfo = (name: unknown) => (dispatch: (action: { type: string; payload: unknown }) => void) => {
  dispatch({ type: t.SET_NAME, payload: name });
  saveToLocalStorage(name, t.SET_NAME);
};

export const setInfo2 = (name2: unknown) => (dispatch: (action: { type: string; payload: unknown }) => void) => {
  dispatch({ type: t.SET_NAME_2, payload: name2 });
  saveToLocalStorage(name2, t.SET_NAME_2);
};

export const setInfo3 = (name3: unknown) => (dispatch: (action: { type: string; payload: unknown }) => void) => {
  dispatch({ type: t.SET_NAME_3, payload: name3 });
  saveToLocalStorage(name3, t.SET_NAME_3);
};

export const saveUser = (user: unknown) => (dispatch: (action: { type: string; payload: unknown }) => void) => {
  dispatch({ type: t.SET_USER, payload: user });
  saveToLocalStorage(user, t.SET_USER);
};

type SendNotificationInput = {
  fcmtoken: string;
  body: string;
  title: string;
  data?: string | Record<string, unknown>;
  redirect?: string;
  image?: string;
  projectID: string;
  accessToken: string;
};

export const sendNotification = (value: SendNotificationInput) => () => {
  const { fcmtoken, body, title, data, redirect, image, projectID, accessToken } = value;
  const defaultData = { Sender: 'https://www.testfcm.in/' };

  if (!projectID || !accessToken || !fcmtoken || !body || !title) {
    Error('Project ID, Access Token, Device Token, Title, and Message are required.');
    return Promise.resolve(false);
  }

  if (looksLikeFcmDeviceToken(accessToken)) {
    Error(
      'Access Token looks like an FCM device token. Use gcloud auth print-access-token — not your device token.'
    );
    return Promise.resolve(false);
  }

  if (fcmtoken.trim() === accessToken.trim()) {
    Error('Access Token and Device Token must be different values.');
    return Promise.resolve(false);
  }

  let parsedData: Record<string, unknown> = defaultData;
  if (data) {
    try {
      parsedData = typeof data === 'string' ? JSON.parse(data) : data;
    } catch {
      Error('Invalid JSON in Data field.');
      return Promise.resolve(false);
    }
  }

  const fcmDataPayload = toFcmDataStrings({
    ...parsedData,
    content_available: 'true',
    priority: 'high',
    click_action: redirect ? String(redirect) : '',
    image: image ? String(image) : '',
  });

  const payload = {
    message: {
      token: fcmtoken,
      notification: { body, title },
      data: fcmDataPayload,
    },
  };

  logger(payload, 'FCM HTTP v1 payload');
  return sendNotificationHTTPV1(projectID, accessToken, payload);
};

function sendNotificationHTTPV1(projectID: string, accessToken: string, payload: unknown) {
  return fetch('/api/send-fcm', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ projectID, accessToken, payload }),
  })
    .then(async (res) => {
      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        Error('Could not reach /api/send-fcm. Restart the dev server (npm run dev).');
        return false;
      }
      if (json.ok) {
        Success('Notification sent successfully via HTTP v1.');
        return true;
      }
      const detail = formatProxyError(json.fcmStatus, json.data);
      Error(detail || 'Could Not Send Notification.');
      return false;
    })
    .catch((e) => {
      logger(e, 'send-fcm failed');
      Error('Could Not Send Notification. Server proxy unreachable.');
      return false;
    });
}

function formatProxyError(status: number, data: Record<string, unknown>) {
  const err = data?.error as Record<string, unknown> | string | undefined;
  const message = (typeof err === 'object' ? err?.message : err) || data?.message || data?.raw;
  if (typeof message === 'object') return `FCM error (${status}): ${JSON.stringify(message)}`;
  if (message) return `FCM error (${status}): ${message}`;
  return null;
}

function looksLikeFcmDeviceToken(token: string | undefined) {
  if (!token) return false;
  const trimmed = token.trim();
  return trimmed.includes('APA91') || (trimmed.includes(':') && !trimmed.startsWith('ya29.') && trimmed.length > 80);
}
