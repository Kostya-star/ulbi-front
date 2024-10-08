import { memo } from 'react';

// import cls from './NotificationButton.module.scss';
import { NotificationList } from '@/entities/Notification';
import NotificationIcon from '@/shared/assets/icons/notification.svg';
import { usePopupController } from '@/shared/hooks/usePopupController/usePopupController';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Drawer } from '@/shared/ui/Drawer';
import { Icon } from '@/shared/ui/Icon';

import cls from './NotificationButton.module.scss';

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
