import * as t from '../types';

const defaultState = {
  name: [],
  name2: false,
  name3: [],
  user: [],
};

const main = (state = defaultState, action: any) => {
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
