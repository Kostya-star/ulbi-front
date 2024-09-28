import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Card, CardTheme } from 'shared/ui/Card/Card';
import { HStack } from 'shared/ui/Stack';
import { Text, TextSize } from 'shared/ui/Text/Text';
import UpRightFromSquareIcon from 'shared/assets/icons/up-right-from-square-solid.svg';
import { Icon } from 'shared/ui/Icon/Icon';
import type { NotificationItem as INotificationItem } from '../../model/types/notification';
import cls from './NotificationItem.module.scss';

interface NotificationItemProps {
  className?: string;
  notification: INotificationItem;
}

export const NotificationItem = memo(({ className, notification }: NotificationItemProps) => {
  return (
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
      {
        notification.href
          ? (
            <AppLink
              target='_blank'
              to={notification.href}
              className={cls.link}
            >
              <Icon Svg={UpRightFromSquareIcon} className={cls.linkIcon} />
            </AppLink>
          )
          : null
      }
    </Card>
  );
});