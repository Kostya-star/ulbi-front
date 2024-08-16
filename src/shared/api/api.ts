// import axios from 'axios';
// import { USER_DATA_LOCAL_STORAGE } from 'shared/const/localStorage';

// export const $api = axios.create({
//   baseURL: __API_URL__,
//   headers: {
//     authorization: localStorage.getItem(USER_DATA_LOCAL_STORAGE) || '',
//   },
// });

import axios from 'axios';
import { USER_DATA_LOCAL_STORAGE } from 'shared/const/localStorage';

export const $api = axios.create({
  baseURL: __API_URL__,
});

// Add a request interceptor
$api.interceptors.request.use((config) => {
  const token = localStorage.getItem(USER_DATA_LOCAL_STORAGE);

  if (token) {
    config.headers!.Authorization = `Bearer ${token}`;
  }

  return config;
}, (error) => {
  // Handle request error here
  return Promise.reject(error);
});
