import { paymentActionTypes } from './action-types';

export const paymentInitialState = { data: [], new: null };

export const paymentReducer = (state = paymentInitialState, { type, payload }) => {
  switch (type) {
    case paymentActionTypes.LoadAll:
      const { status, data } = payload;
      const _ = Object.values(data ?? {});
      return { ...state, status, data: _ };

    // case investmentActionTypes.GetMore:
    //   return { ...state, data: [...state.data, ...payload] };

    case paymentActionTypes.Make:
      return { ...state, new: payload };

    case paymentActionTypes.ClearAll:
      return Object.assign(paymentInitialState, state);

    default:
      return state;
  }
};
