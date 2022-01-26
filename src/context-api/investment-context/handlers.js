import { investmentActionTypes } from './action-types';

export const handleLoadAllInvestments = payload => ({
  type: investmentActionTypes.LoadAll,
  payload,
});

export const handleLoadInvestmentsDatas = payload => ({
  type: investmentActionTypes.LoadDatas,
  payload,
});

export const handleMakeInvestments = payload => ({
  type: investmentActionTypes.Make,
  payload,
});

// export const handleHideIndicator = () => ({
//   type: investmentActionTypes.Hide,
// });
