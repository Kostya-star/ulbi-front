import { memo, useEffect, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { setJsonSettings, useJsonSettings } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { Modal } from '@/shared/ui/Modal';

export const GreetingModal = memo(() => {
  const { t } = useTranslation();
  const [isOpen, setOpen] = useState(false);
  const { isFirstVisit } = useJsonSettings();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isFirstVisit) {
      setOpen(true);
      dispatch(setJsonSettings({ isFirstVisit: false }));
    }
  }, [isFirstVisit, dispatch]);

  const onModalClose = () => {
    setOpen(false);
  };

  return (
    <Modal lazy isOpen={isOpen} onClose={onModalClose}>
      {t('greeting_message')}
    </Modal>
  );
});
