import { axiosInstance } from '../utils/axios-config';
import { fetchBaseURL, investmentBaseURL } from '../utils/constants';

// fetch all investments === DONE
export const fetchInvestmentsListRequest = async ({ user_id }) => {
  try {
    const res = await axiosInstance.get(fetchBaseURL + `investment?user_id=${user_id}`, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// fetch investments datas === DONE
// TODO:: not displaying dashboard yet
export const fetchInvestmentFundRequest = async ({ user_id }) => {
  try {
    const res = await axiosInstance.get(fetchBaseURL + `investment_fund?user_id=${user_id}`, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// make new investment === DONE
export const makeInvestmentFundRequest = async ({ user_id, amount }) => {
  try {
    const data = new FormData();
    data.append('user_id', user_id);
    data.append('amount', amount);
    const res = await axiosInstance.post(investmentBaseURL + 'make', data, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};
