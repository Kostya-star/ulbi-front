import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';

export const rtkApi = createApi({
  reducerPath: 'rtkApi',
  baseQuery: fetchBaseQuery({
    baseUrl: __API_URL__,
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
