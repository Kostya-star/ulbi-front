import { useCallback, useEffect, useState } from 'react';

export function usePopupController() {
  const [isOpen, setOpen] = useState(false);

  const onClose = useCallback(() => {
    setOpen(false);
  }, []);

  const onOpen = useCallback(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    const onExitKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener('keydown', onExitKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onExitKeyDown);
    };
  }, [isOpen, onClose]);

  return {
    isOpen,
    onOpen,
    onClose,
  };
}
