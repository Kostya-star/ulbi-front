import axios from 'axios';
import { USER_DATA_LOCAL_STORAGE } from 'shared/const/localStorage';

export const $api = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    authorization: localStorage.getItem(USER_DATA_LOCAL_STORAGE),
  },
});
