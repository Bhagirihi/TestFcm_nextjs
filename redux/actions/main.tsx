import { firebaseDB } from '@/components/Initializetion';
import { Error, Success } from '@/components/toast';

import * as t from '../types';

console.log(firebaseDB, ':firebaseDB');

function saveToLocalStorage(value: any, name: any) {
  try {
    const serializedStore = JSON.stringify(value);
    window.localStorage.setItem(name, serializedStore);
    //Add To Firebase
    console.log('name-value', name, value);
  } catch (e) {
    console.log(e);
  }
}

export const setInfo = (name: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_NAME,
    payload: name,
  });
  saveToLocalStorage(name, t.SET_NAME);
};

export const setInfo2 = (name2: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_NAME_2,
    payload: name2,
  });
  saveToLocalStorage(name2, t.SET_NAME_2);
};

export const setInfo3 = (name3: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_NAME_3,
    payload: name3,
  });
  saveToLocalStorage(name3, t.SET_NAME_3);
};

export const saveUser = (user: any) => (dispatch: any) => {
  console.log(user);
  dispatch({
    type: t.SET_USER,
    payload: user,
  });
  console.log(user, t.SET_USER, 'IS SAVED');
  saveToLocalStorage(user, t.SET_USER);
};

export const sendNotification = (value: any) => (dispatch: any) => {
  console.log('------- Action Notification', value);
  const { fcmtoken, serverkey, body, title, data, redirect, image, http, projectID, accessToken } = value;

  const JSONData = data ? JSON.parse(data) : {};
  const FCMDataLegacy = {
    to: fcmtoken,
    notification: {
      body: body,
      content_available: true,
      priority: 'high',
      title: title,
      click_action: redirect,
      image: image,
    },
    data: JSONData,
  };

  const FCMDataHTTPV1 = {
    message: {
      token: fcmtoken,
      notification: {
        body: body,
        content_available: true,
        priority: 'high',
        title: title,
        click_action: redirect,
        image: image,
      },
      data: JSONData,
    },
  };
  console.log('HTTP ---->', http);
  if (!http) {
    return SendNotificationLegacy(serverkey, FCMDataLegacy);
  } else {
    return SendNotificationHTTPV1(projectID, accessToken, FCMDataHTTPV1);
  }
};

export const SendNotificationLegacy = (serverkey: any, FCMData: any) => {
  fetch('https://fcm.googleapis.com/fcm/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `key=${serverkey}`,
    },
    body: JSON.stringify(FCMData),
  })
    .then((res) => {
      res.status == '200'
        ? Success('Notification send successfully using Legacy.')
        : Error('Could Not Send Notification.');
    })
    .catch((e) => {
      console.log('E', e), Error('Could Not Notificatio Send.');
    });
};

export const SendNotificationHTTPV1 = (projectID: any, accessToken: any, FCMData: any) => {
  fetch(`https://fcm.googleapis.com/v1/projects/${projectID}/messages:send`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(FCMData),
  })
    .then((res) => {
      res.status == '200'
        ? Success('Notification send successfully using HTTPV1.')
        : Error('Could Not Send Notification.');
    })
    .catch((e) => {
      console.log('E', e), Error('Could Not Notificatio Send.');
    });
};
