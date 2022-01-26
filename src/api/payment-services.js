import { axiosInstance } from '../utils/axios-config';
import { fetchBaseURL } from '../utils/constants';

// fetch all payment history list === DONE
export const fetchPaymentsListRequest = async ({ user_email }) => {
  try {
    const res = await axiosInstance.get(fetchBaseURL + `payment?email=${user_email}`, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};
