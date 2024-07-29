/* eslint-disable max-len */
/* eslint-disable i18next/no-literal-string */
import { MakeErrorTestBtn } from 'app/providers/ErrorBoundary';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import { Modal } from 'shared/ui/Modal/Modal';
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

      {/* eslint-disable-next-line i18next/no-literal-string */}
      <Button theme={ButtonTheme.CLEAR_INVERTED} onClick={onOpenAuthModal}>
        { t('sign_in') }
      </Button>

      <Modal isOpen={isAuthModal} onClose={onCloseAuthModal}>
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Praesentium, exercitationem? Excepturi id perspiciatis in quae odio obcaecati tempore, facere nihil beatae ex delectus accusamus, quam debitis alias commodi, labore similique.
      </Modal>
    </div>
  );
}
