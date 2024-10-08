import { memo, useMemo, useState } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Popover } from '@/shared/ui/Popover';
// import cls from './NotificationButton.module.scss';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { NotificationList } from '@/entities/Notification';
import { useDevice } from '@/shared/hooks/useDevice/useDevice';
import { Drawer } from '@/shared/ui/Drawer';
import { usePopupController } from '@/shared/hooks/usePopupController/usePopupController';
import { AnimationProvider } from '@/shared/lib/AnimationProvider/AnimationProvider';
import cls from './NotificationButton.module.scss';
import { Input } from '@/shared/ui/Input';

interface NotificationButtonProps {
  className?: string;
}

export const NotificationButton = memo(({ className }: NotificationButtonProps) => {
  // const isMobile = useDevice();

  const {
    isOpen: isDrawerOpen,
    onOpen: openDrawer,
    onClose: closeDrawer,
  } = usePopupController();

  return (
    <>
      <Button theme={ButtonTheme.CLEAR} onClick={openDrawer}>
        <Icon Svg={NotificationIcon} invertedColor />
      </Button>
      {
        isDrawerOpen && (
          <Drawer
            side='right'
            isOpen={isDrawerOpen}
            onClose={closeDrawer}
          >
            <NotificationList className={cls.mobileNotificationsList} />
          </Drawer>
        )
      }
    </>
  );
  // return (
  //   isMobile
  //     ? (
  //       <>
  //         {buttonTrigger}
  //         <Drawer side='right' isOpen={isDrawerOpen} onClose={closeDrawer}>
  //           <NotificationList className={cls.mobileNotificationsList} />
  //         </Drawer>
  //       </>
  //     )
  //     : (
  //       <Popover
  //         trigger={buttonTrigger}
  //         direction='bottom left'
  //       >
  //         <NotificationList className={cls.desktopNotificationsList} />
  //       </Popover>
  //     )
  // );
});
