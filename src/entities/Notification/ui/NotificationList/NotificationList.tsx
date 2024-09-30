import { classNames } from '@/shared/lib/classNames/classNames';
import { memo } from 'react';
import { VStack } from '@/shared/ui/Stack';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import cls from './NotificationList.module.scss';
import { useGetNotificationsList } from '../../api/notificationApi';
import { NotificationItem } from '../NotificationItem/NotificationItem';

interface NotificationListProps {
  className?: string;
}

const POLLING_INTERVAL = 5000;

export const NotificationList = memo(({ className }: NotificationListProps) => {
  const { data: notifications, isLoading } = useGetNotificationsList(null, {
    pollingInterval: POLLING_INTERVAL,
  });

  if (isLoading) {
    return (
      <VStack gap='8' allWidth className={className}>
        <Skeleton height='80px' borderRadius='8px' />
        <Skeleton height='80px' borderRadius='8px' />
        <Skeleton height='80px' borderRadius='8px' />
      </VStack>

    );
  }

  return (
    <VStack gap='8' allWidth className={className}>
      {
        notifications?.map((n) => (
          <NotificationItem key={n.id} notification={n} />
        ))
      }
    </VStack>
  );
});
