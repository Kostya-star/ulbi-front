import { MakeErrorTestBtn } from 'app/providers/ErrorBoundary';
import { LoginModal } from 'features/AuthByUsername';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  const { t } = useTranslation();
  const [isAuthModal, setAuthModal] = useState(false);

  const onCloseAuthModal = useCallback(() => setAuthModal(false), []);
  const onOpenAuthModal = useCallback(() => setAuthModal(true), []);

  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <MakeErrorTestBtn />

      <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onOpenAuthModal}>
        { t('sign_in') }
      </Button>

      <LoginModal isOpen={isAuthModal} onClose={onCloseAuthModal} />
    </div>
  );
}
