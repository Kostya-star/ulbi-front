import { memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

// import cls from './AvatarDropdown.module.scss';
import { getRouteAdminPanel, getRouteMain, getRouteProfile } from '@/app/providers/router';
import { getAuthUserData, isUserAdmin, isUserManager, logout } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { Avatar } from '@/shared/ui/Avatar';
import { Dropdown } from '@/shared/ui/Dropdown';

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
    navigate(getRouteMain());
  }, [dispatch, navigate]);

  if (!authData) return null;

  return (
    <Dropdown
      trigger={<Avatar fallbackInverted size={30} src={authData.avatar} />}
      direction="bottom left"
      items={[
        ...(isAdminPanelAvailable
          ? [
              {
                content: t('admin_panel'),
                href: getRouteAdminPanel(),
              },
            ]
          : []),
        {
          content: t('profile'),
          href: getRouteProfile(authData.id),
        },
        {
          content: t('sign_out'),
          onClick: onLogout,
        },
      ]}
    />
  );
});
