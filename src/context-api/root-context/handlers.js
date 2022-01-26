import { rootActionTypes } from './action-types';

export const handleLoadUser = payload => ({
  type: rootActionTypes.LoadUser,
  payload,
});

export const handleClearRoot = () => ({
  type: rootActionTypes.ClearAll,
});
