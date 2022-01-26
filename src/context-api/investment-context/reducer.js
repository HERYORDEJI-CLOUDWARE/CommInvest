import { investmentActionTypes } from './action-types';

export const investmentInitialState = { data: [], new: null, others: {} };

export const investmentReducer = (state = investmentInitialState, { type, payload }) => {
  switch (type) {
    case investmentActionTypes.LoadAll:
      const { status, data } = payload;
      const _ = Object.values(data ?? {});
      return { ...state, status, data: _ };

    case investmentActionTypes.LoadDatas:
      return { ...state, others: payload };

    case investmentActionTypes.Make:
      return { ...state, new: payload };

    default:
      return state;
  }
};
