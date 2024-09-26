import { memo, ReactNode, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import type { NotificationItem as INotificationItem } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  notification: INotificationItem;
}

export const NotificationItem = memo(({ className, notification }: NotificationItemProps) => {
  const notificationCard = useMemo(() => (
    <Card
      className={classNames(cls.NotificationItem, {}, [className])}
      theme={CardTheme.OUTLINE}
    >
      <Text text={notification.title} size={TextSize.M} />
      <HStack justifyContent='between' alignItems='center'>
        <Text text={notification.description} size={TextSize.S} />
        <HStack alignItems='center' gap='8'>
          <Text text={notification.user.username} size={TextSize.S} />
          <Avatar src={notification.user.avatar} size={25} />
        </HStack>
      </HStack>
    </Card>
  ), [className, notification.description, notification.title, notification.user.avatar, notification.user.username]);

  if (notification.href) {
    return (
      <AppLink
        target='_blank'
        to={notification.href}
        className={classNames(cls.NotificationItem, {}, [className])}
      >
        {notificationCard}
      </AppLink>
    );
  }

  return notificationCard;
});
