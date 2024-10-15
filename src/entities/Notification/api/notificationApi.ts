import { rtkApi } from '@/shared/api/rtkApi';

import { NotificationItem } from '../model/types/notification';

const notificationApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getNotificationList: build.query<NotificationItem[], null>({
      query: () => ({
        url: '/notifications',
        params: {
          _expand: 'user',
        },
      }),
    }),
  }),
});

export const useGetNotificationsList =
  notificationApi.useGetNotificationListQuery;
