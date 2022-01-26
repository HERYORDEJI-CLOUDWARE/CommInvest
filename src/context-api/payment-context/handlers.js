import { paymentActionTypes } from './action-types';

export const handleLoadAllPayments = payload => ({
  type: paymentActionTypes.LoadAll,
  payload,
});

export const handleLoadPaymentsDatas = payload => ({
  type: paymentActionTypes.LoadDatas,
  payload,
});

export const handleLoadClearAllPayments = () => ({
  type: paymentActionTypes.ClearAll,
});
