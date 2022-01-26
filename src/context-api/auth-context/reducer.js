import { authActionTypes } from './action-types';

export const authInitialState = { first_name: 'Yusuf', last_name: 'Oyebode' };

export const authReducer = (state = authInitialState, { type, payload }) => {
  switch (type) {
    case authActionTypes.Login:
      return { ...state, ...payload };

    case authActionTypes.Register:
      return { ...state, ...payload };

    case authActionTypes.Logout:
      return Object.assign(authInitialState, state);

    default:
      return state;
  }
};
