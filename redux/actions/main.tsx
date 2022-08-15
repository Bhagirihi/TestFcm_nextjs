import * as t from '../types';

function saveToLocalStorage(value: any, name: any) {
  try {
    const serializedStore = JSON.stringify(value);
    window.localStorage.setItem(name, serializedStore);
  } catch (e) {
    console.log(e);
  }
}

export const setInfo = (name: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_NAME,
    payload: name,
  });
  saveToLocalStorage(name, t.SET_NAME)
};

export const setInfo2 = (name2: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_NAME_2,
    payload: name2,
  });
  saveToLocalStorage(name2, t.SET_NAME_2)
};
export const setInfo3 = (name3: any) => (dispatch: any) => {
  dispatch({
    type: t.SET_NAME_3,
    payload: name3,
  });
  saveToLocalStorage(name3, t.SET_NAME_3)
};
