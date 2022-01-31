import axios from 'axios';
import { axiosBaseURL, axiosTimeout } from './constants';
import { API_TOKEN } from '@env';

export const axiosController = new AbortController();

function onUploadProgress(ev) {
  console.log('\n\n onUploadProgress \t\t', ev, '\n\n');
  // do your thing here
}

function onDownloadProgress(ev) {
  console.log('\n\n onDownloadProgress \t\t', ev, '\n\n');
  // do your thing here
}

export const setAxiosToken = ({ token }) => {
  // if (token) {
  //   return (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`);
  // }
  // delete axios.defaults.headers.common['Authorization'];
};

export const axiosInstance = axios.create({
  baseURL: axiosBaseURL,
  timeout: axiosTimeout,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
  signal: axiosController.signal,
});

axios.interceptors.request.use(config => ({
  onUploadProgress: config.onUploadProgress || onUploadProgress,
  onDownloadProgress: config.onDownloadProgress || onDownloadProgress,
}));
