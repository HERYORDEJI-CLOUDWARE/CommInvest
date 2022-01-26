import { axiosInstance } from '../utils/axios-config';
import { fetchBaseURL, supportBaseURL } from '../utils/constants';

/*
data.append('images[]', {
        uri: item.path,
        type: 'multipart/form-data',
        name: item.filename || `filename${i}.jpg`,
      });
 */
// send message to the support unit === DONE
export const supportRequest = async ({ user_id, issue, message, evidence }) => {
  try {
    const data = new FormData();
    data.append('user_id', user_id);
    data.append('issue', issue);
    data.append('message', message);
    {
      evidence &&
        data.append('evidence', {
          uri: evidence.uri,
          type: 'multipart/form-data',
          name: evidence.fileName,
        });
    }
    const res = await axiosInstance.post(supportBaseURL + 'user_support', data, {
      timeout: 5000,
    });
    return res.data;
  } catch (err) {
    const { data } = err.response;
    return data;
  }
};
