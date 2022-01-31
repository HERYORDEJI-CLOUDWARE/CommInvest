import { rootActionTypes } from './action-types';

export const rootInitialState = {
  user_details: null,
  kyc_details: null,
};

export const rootReducer = (state = rootInitialState, { type, payload }) => {
  switch (type) {
    case rootActionTypes.LoadUser:
      return { ...state, user_details: { ...payload } };

    case rootActionTypes.LoadKyc:
      return { ...state, kyc_details: { ...payload } };

    // case rootActionTypes.ClearAll:
    //   return Object.assign(rootInitialState, state);

    case rootActionTypes.ClearAll:
      return { ...state, ...rootInitialState };

    default:
      return state;
  }
};

const _ = {
  user_id: '2',
  user_firstname: 'ade',
  user_lastname: 'bayo',
  user_phone: '+2348123456789',
  user_email: 'tesft@email.com',
  user_bvn: '12345678901',
  user_password: '$2y$10$6/Y0ZyDroHBsvVQxvcs9y.qKDj61MiLYVjilNisZftC.tsraYapNG',
  rave_txRef: 'vta80094715',
  account_no: '7350209840',
  account_name: 'ade bayo',
  account_note: 'Please make a bank transfer to ade bayo  FLW',
  account_bank: 'WEMA BANK',
  link_key: '',
  link_expire: '',
  user_avatar: 'profile_avatar/2736bb869f2235146304448403aad2e5.jpg',
  create_date: '10-01-2022 07:11:29',
  update_date: '20-01-2022 05:19:51',
  user_status: '1',
  user_disabled: '1',
};
