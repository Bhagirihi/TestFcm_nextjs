import * as t from '../types';

function loadFromLocalStorage(value) {
  try {
    const serializedStore = window.localStorage.getItem(value);
    if (serializedStore === null) return undefined;
    return JSON.parse(serializedStore);
  } catch (e) {
    console.log(e);
    return undefined;
  }
}

const initState = {
  name: loadFromLocalStorage(t.SET_NAME) || [],
  name2: loadFromLocalStorage(t.SET_NAME_2) || false,
  name3: loadFromLocalStorage(t.SET_NAME_3) || [],
  user: loadFromLocalStorage(t.SET_USER) || [],
};

const main = (state = initState, action: any) => {
  switch (action.type) {
    case t.SET_NAME:
      return {
        ...state,
        name: action.payload,
      };
    case t.SET_NAME_2:
      return {
        ...state,
        name2: action.payload,
      };
    case t.SET_NAME_3:
      return {
        ...state,
        name3: action.payload,
      };
    case t.SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return { ...state };
  }
};

export default main;
