import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { saveUser, setInfo, setInfo2, setInfo3 } from '../../redux/actions/main';
import * as t from '../../redux/types';

function loadFromLocalStorage(key: string) {
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return undefined;
    return JSON.parse(raw);
  } catch {
    return undefined;
  }
}

/** Loads persisted Redux state after mount so SSR and first client paint match. */
export default function ReduxRehydrate() {
  const dispatch = useDispatch();

  useEffect(() => {
    const name = loadFromLocalStorage(t.SET_NAME);
    const name2 = loadFromLocalStorage(t.SET_NAME_2);
    const name3 = loadFromLocalStorage(t.SET_NAME_3);
    const user = loadFromLocalStorage(t.SET_USER);

    if (name !== undefined) dispatch(setInfo(name));
    if (name2 !== undefined) dispatch(setInfo2(name2));
    if (name3 !== undefined) dispatch(setInfo3(name3));
    if (user !== undefined) dispatch(saveUser(user));
  }, [dispatch]);

  return null;
}
