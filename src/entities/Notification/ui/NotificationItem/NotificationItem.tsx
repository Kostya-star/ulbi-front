import { memo } from 'react';

import UpRightFromSquareIcon from '@/shared/assets/icons/up-right-from-square-solid.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Card, CardTheme } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text, TextSize } from '@/shared/ui/Text';

import cls from './NotificationItem.module.scss';
import type { NotificationItem as INotificationItem } from '../../model/types/notification';

interface NotificationItemProps {
  className?: string;
  notification: INotificationItem;
}

export const NotificationItem = memo(
  ({ className, notification }: NotificationItemProps) => {
    return (
      <Card
        className={classNames(cls.NotificationItem, {}, [className])}
        theme={CardTheme.OUTLINE}
      >
        <Text text={notification.title} size={TextSize.M} />
        <HStack justifyContent="between" alignItems="center">
          <Text text={notification.description} size={TextSize.S} />
          <HStack alignItems="center" gap="8">
            <Text text={notification.user.username} size={TextSize.S} />
            <Avatar src={notification.user.avatar} size={25} />
          </HStack>
        </HStack>
        {notification.href ? (
          <AppLink target="_blank" to={notification.href} className={cls.link}>
            <Icon Svg={UpRightFromSquareIcon} className={cls.linkIcon} />
          </AppLink>
        ) : null}
      </Card>
    );
  },
);
