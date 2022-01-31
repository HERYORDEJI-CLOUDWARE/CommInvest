import { axiosController, axiosInstance } from '../utils/axios-config';
import { userBaseURL, kycBaseURL, fetchBaseURL } from '../utils/constants';
import { IndicatorContext } from '../context-api/indicator-context';
import { handleErrorIndicator } from '../context-api/indicator-context/handlers';

// register user
export const registerRequest = async ({ first_name, last_name, bvn, phone, email, password }) => {
  try {
    const data = new FormData();
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('bvn', bvn);
    data.append('phone', phone);
    data.append('email', email);
    data.append('password', password);
    const res = await axiosInstance.post(userBaseURL + 'register', data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// user login === DONE
export const loginRequest = async ({ email, password }) => {
  try {
    const data = new FormData();
    data.append('username', email);
    data.append('password', password);
    let res = await axiosInstance.post(userBaseURL + 'login', data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    console.log('\n\n', JSON.stringify(err));
    const { data } = err.response;
    return data;
  }
};

// fetch user details === DONE
export const fetchUserRequest = async ({ user_id }) => {
  try {
    const res = await axiosInstance.get(fetchBaseURL + `user?user_id=${user_id}`, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// fetch user Kyc === DONE
export const fetchKycRequest = async ({ user_id }) => {
  try {
    const res = await axiosInstance.get(fetchBaseURL + `kyc?user_id=${user_id}`, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// edit profile === DONE
export const editProfileRequest = async ({ first_name, last_name, phone, user_id, avatar }) => {
  try {
    const data = new FormData();
    data.append('first_name', first_name);
    data.append('last_name', last_name);
    data.append('phone', phone);
    data.append('user_id', user_id);
    {
      avatar &&
        data.append('avatar', {
          uri: avatar.uri,
          type: 'multipart/form-data',
          name: avatar.fileName,
        });
    }
    const res = await axiosInstance.post(userBaseURL + 'edit_user', data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};
// to change password === DONE
export const changePasswordRequest = async ({ current_password, new_password, user_id }) => {
  try {
    const data = new FormData();
    data.append('current_password', current_password);
    data.append('new_password', new_password);
    data.append('user_id', user_id);
    const res = await axiosInstance.post(userBaseURL + 'change_user_password', data, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// fet activation link === DONE
export const activationLinkRequest = async ({ email }) => {
  try {
    const data = new FormData();
    data.append('email', email);
    const res = await axiosInstance.post(userBaseURL + 'resend_activate_link', data, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

export const activateUserRequest = async ({ token }) => {
  try {
    const data = new FormData();
    data.append('token', token);
    const res = await axiosInstance.post(userBaseURL + 'activate_user', data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// to recover password === DONE
export const forgetPasswordRequest = async ({ email }) => {
  try {
    const data = new FormData();
    data.append('email', email);
    const res = await axiosInstance.post(userBaseURL + 'forget_password', data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};

// register kyc === DONE
export const registerKycRequest = async ({
  user_id,
  dob,
  country_of_birth,
  citizenship,
  country_of_tax,
  next_of_kin,
  tax_id,
  residency,
  gender,
  resident_address,
  employment_status,
  national_id,
  upload_card,
}) => {
  try {
    const data = new FormData();
    data.append('user_id', user_id);
    data.append('country_of_birth', country_of_birth);
    data.append('citizenship', citizenship);
    data.append('country_of_tax', country_of_tax);
    data.append('next_of_kin', next_of_kin);
    data.append('tax_id', tax_id);
    data.append('residency', residency);
    data.append('gender', gender);
    data.append('resident_address', resident_address);
    data.append('employment_status', employment_status);
    data.append('national_id', national_id);
    data.append('upload_card', {
      uri: upload_card.uri,
      type: 'multipart/form-data',
      name: upload_card.fileName,
    });
    const res = await axiosInstance.post(kycBaseURL + 'register_kyc', data, { timeout: 5000 });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};
