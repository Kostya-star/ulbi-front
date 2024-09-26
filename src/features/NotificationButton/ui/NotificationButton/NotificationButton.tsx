import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popover/Popover';
// import cls from './NotificationButton.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notification';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
  return (
    <Popover
      trigger={
    (
      <Button theme={ButtonTheme.CLEAR}>
        <Icon Svg={NotificationIcon} invertedColor />
      </Button>
    )
  }
      direction='bottom left'
    >
      <NotificationList />
    </Popover>
  );
});
