import { useTheme } from 'app/providers/ThemeProvider';
import {
  FC, MouseEvent, ReactNode, useCallback, useEffect,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Portal } from 'shared/ui/Portal/Portal';
import cls from './Modal.module.scss';

interface ModalProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  children, className, isOpen, onClose,
}) => {
  const { theme } = useTheme();
  const handleClose = useCallback(() => onClose?.(), [onClose]);
  const onContentClick = (e: MouseEvent) => e.stopPropagation();

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") handleClose();
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <Portal>
      <div className={
        classNames(cls.Modal, { [cls.opened]: isOpen }, [className, theme])
    }
      >
        <div className={cls.overlay} onClick={handleClose}>
          <div className={cls.content} onClick={onContentClick}>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
};
