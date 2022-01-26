import { indicatorActionTypes } from './action-types';

export const indicatorInitialState = {
  status: null,
  isVisible: true,
  title: null,
  message: null,
  showKyc: null,
};

export const indicatorReducer = (state = indicatorInitialState, { type, payload }) => {
  switch (type) {
    case indicatorActionTypes.Loading:
      return { ...state, ...payload };

    case indicatorActionTypes.Success:
      return { ...state, ...payload };

    case indicatorActionTypes.Error:
      return { ...state, ...payload };

    case indicatorActionTypes.ShowKyc:
      return { ...state, showKyc: true };

    case indicatorActionTypes.HideKyc:
      return { ...state, showKyc: false };

    case indicatorActionTypes.Hide:
      return { ...state, ...indicatorInitialState };

    default:
      return state;
  }
};
