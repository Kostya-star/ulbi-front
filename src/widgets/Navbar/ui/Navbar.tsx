import { MakeErrorTestBtn } from 'app/providers/ErrorBoundary';
import { getAuthUserData, logout } from 'entities/User';
import { LoginModal } from 'features/AuthByUsername';
import {
  memo, useCallback, useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export const Navbar = memo(({ className }: NavbarProps) => {
  const { t } = useTranslation();
  const [isAuthModal, setAuthModal] = useState(false);

  const authData = useSelector(getAuthUserData);
  const dispatch = useAppDispatch();

  const onCloseAuthModal = useCallback(() => setAuthModal(false), []);
  const onOpenAuthModal = useCallback(() => setAuthModal(true), []);
  const onLogout = useCallback(() => dispatch(logout()), [dispatch]);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <MakeErrorTestBtn />

      {!authData
        ? (
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onOpenAuthModal}>
            { t('sign_in') }
          </Button>
        )
        : (
          <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onLogout}>
            { t('sign_out') }
          </Button>
        )}

      <LoginModal isOpen={isAuthModal} onClose={onCloseAuthModal} />
    </div>
  );
});
