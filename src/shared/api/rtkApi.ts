import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';
import 'isomorphic-fetch';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API_URL__,
    // baseUrl: 'https://cbd1-2a03-f680-fe03-e4b-ec57-bcce-7d7-88d2.ngrok-free.app',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem(USER_DATA_LOCAL_STORAGE) || '';
      if (token) {
        headers.set('Authorization', token);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
  tagTypes: ['GetArticleRating'],
});
