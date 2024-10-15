// import axios from 'axios';
// import { USER_DATA_LOCAL_STORAGE } from 'shared/const/localStorage';

// export const $api = axios.create({
//   baseURL: __API_URL__,
//   headers: {
//     authorization: localStorage.getItem(USER_DATA_LOCAL_STORAGE) || '',
//   },
// });

import axios from 'axios';

import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';

export const $api = axios.create({
  baseURL: __API_URL__,
  // baseURL: 'https://cbd1-2a03-f680-fe03-e4b-ec57-bcce-7d7-88d2.ngrok-free.app',
});

// Add a request interceptor
$api.interceptors.request.use(
  (config) => {
    if (config.headers) {
      const token = localStorage.getItem(USER_DATA_LOCAL_STORAGE) || '';
      config.headers.Authorization = token;
    }

    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  },
);
