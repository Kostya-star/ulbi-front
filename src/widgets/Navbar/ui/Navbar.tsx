import { MakeErrorTestBtn } from 'app/providers/ErrorBoundary';
import {
  getAuthUserData, isUserAdmin, isUserManager, logout,
} from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import { AvatarDropdown } from 'features/AvatarDropdown';
import { NotificationButton } from 'features/NotificationButton';
import {
  memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Dropdown } from 'shared/ui/Dropdown/Dropdown';
import { HStack } from 'shared/ui/Stack';
import { Text } from 'shared/ui/Text/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const [isAuthModal, setAuthModal] = useState(false);

  const authData = useSelector(getAuthUserData);

  const onCloseAuthModal = useCallback(() => setAuthModal(false), []);
  const onOpenAuthModal = useCallback(() => setAuthModal(true), []);

  if (authData) {
    return (
      <HStack
        tag='nav'
        justifyContent='between'
        alignItems='center'
        allWidth
        className={classNames(cls.Navbar, {}, [className])}
      >
        <Text title={t('blog')} className={cls.logo} />

        <HStack
          justifyContent='between'
          alignItems='center'
          allWidth
        >
          <AppLink to={RoutePath.article_create}>
            {t('create_article')}
          </AppLink>
          <HStack gap='16' alignItems='center'>
            <NotificationButton />
            <AvatarDropdown />
          </HStack>
          {/* <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onLogout}>
            { t('sign_out') }
          </Button> */}
        </HStack>
      </HStack>
    );
  }

  return (
    <HStack
      justifyContent='between'
      alignItems='center'
      allWidth
      className={classNames(cls.Navbar, {}, [className])}
    >
      {/* <MakeErrorTestBtn /> */}
      <Text title={t('blog')} className={cls.logo} />

      <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onOpenAuthModal}>
        { t('sign_in') }
      </Button>

      <LoginModal isOpen={isAuthModal} onClose={onCloseAuthModal} />
    </HStack>
  );
});
