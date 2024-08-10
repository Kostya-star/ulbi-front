import axios from 'axios';
import { USER_DATA_LOCAL_STORAGE } from 'shared/const/localStorage';

export const $api = axios.create({
  baseURL: __API_URL__,
  headers: {
    authorization: localStorage.getItem(USER_DATA_LOCAL_STORAGE) || '',
  },
});
