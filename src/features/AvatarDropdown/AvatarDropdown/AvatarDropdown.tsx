import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Popover } from 'shared/ui/Popover/Popover';
// import cls from './AvatarDropdown.module.scss';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Icon } from 'shared/ui/Icon/Icon';
import NotificationIcon from 'shared/assets/icons/notification.svg';
import { NotificationList } from 'entities/Notification';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import {
  getAuthUserData, isUserAdmin, isUserManager, logout,
} from 'entities/User';
import { useTranslation } from 'react-i18next';

interface AvatarDropdownProps {
  className?: string;
}

export const AvatarDropdown = memo(({ className }: AvatarDropdownProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const authData = useSelector(getAuthUserData);

  const isAdmin = useSelector(isUserAdmin);
  const isManager = useSelector(isUserManager);

  const isAdminPanelAvailable = useMemo(() => isAdmin || isManager, [isAdmin, isManager]);

  const onLogout = useCallback(() => {
    dispatch(logout());
    navigate(RoutePath.main);
  }, [dispatch, navigate]);

  if (!authData) return null;

  return (
    <Dropdown
      trigger={<Avatar size={30} src={authData.avatar} />}
      direction='bottom left'
      items={[
        ...(isAdminPanelAvailable
          ? [{
            content: t('admin_panel'),
            href: RoutePath.admin_panel,
          }]
          : []),
        {
          content: t('profile'),
          href: RoutePath.profile + authData.id,
        },
        {
          content: t('sign_out'),
          onClick: onLogout,
        },
      ]}
    />
  );
});
