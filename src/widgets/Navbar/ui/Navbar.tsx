import {
  memo, useCallback, useMemo, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MakeErrorTestBtn } from '@/app/providers/ErrorBoundary';
import {
  getAuthUserData, isUserAdmin, isUserManager, logout,
} from '@/entities/User';
import { LoginModal } from '@/features/AuthByUsername';
import { AvatarDropdown } from '@/features/AvatarDropdown';
import { NotificationButton } from '@/features/NotificationButton';
import { RoutePath } from '@/app/providers/router/model/config/routeConfig';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useDevice } from '@/shared/hooks/useDevice/useDevice';
import { usePopupController } from '@/shared/hooks/usePopupController/usePopupController';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink/AppLink';
import { Avatar } from '@/shared/ui/Avatar/Avatar';
import { Button, ButtonTheme } from '@/shared/ui/Button/Button';
import { Drawer } from '@/shared/ui/Drawer/Drawer';
import { Dropdown } from '@/shared/ui/Dropdown/Dropdown';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();

  const authData = useSelector(getAuthUserData);

  const {
    isOpen: isModalOpen,
    onOpen: openModal,
    onClose: closeModal,
  } = usePopupController();

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

      <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={openModal}>
        { t('sign_in') }
      </Button>

      <LoginModal isOpen={isModalOpen} onClose={closeModal} />
    </HStack>
  );
});
