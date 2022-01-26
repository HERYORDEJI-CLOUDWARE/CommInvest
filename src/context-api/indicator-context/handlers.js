import { indicatorActionTypes } from './action-types';

export const handleLoadingIndicator = payload => ({
  type: indicatorActionTypes.Loading,
  payload: { isVisible: true, status: indicatorActionTypes.Loading, title: 'Loading', ...payload },
});

export const handleErrorIndicator = payload => ({
  type: indicatorActionTypes.Error,
  payload: { isVisible: true, status: indicatorActionTypes.Error, title: 'Oops!!!', ...payload },
});

export const handleSuccessIndicator = payload => ({
  type: indicatorActionTypes.Success,
  payload: { isVisible: true, status: indicatorActionTypes.Success, title: 'Yeah!!!', ...payload },
});

export const handleHideIndicator = () => ({
  type: indicatorActionTypes.Hide,
});

export const handleHideKycIndicator = () => ({
  type: indicatorActionTypes.HideKyc,
});

export const handleShowKycIndicator = () => ({
  type: indicatorActionTypes.ShowKyc,
});
