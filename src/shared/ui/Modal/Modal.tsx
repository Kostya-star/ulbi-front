import { useTheme } from 'app/providers/ThemeProvider';
import {
  FC, MouseEvent, ReactNode, useCallback, useEffect,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import { HStack } from '../Stack';
import cls from './Modal.module.scss';

interface ModalProps {
  children?: ReactNode;
  className?: string;
  isOpen?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  children, className, isOpen, lazy, onClose,
}) => {
  const { theme } = useTheme();
  // const [isMounted, setMounted] = useState(false)

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

  if (lazy && !isOpen) return null;

  return (
    <Portal>
      <HStack
        justifyContent='center'
        alignItems='center'
        className={classNames(cls.Modal, { [cls.opened]: isOpen }, [className, theme])}
      >
        {/* <div className={cls.overlay} onClick={handleClose}> */}
        <Overlay onClick={handleClose} />
        <div className={cls.content} onClick={onContentClick}>
          {children}
        </div>
      </HStack>
      {/* </div> */}
    </Portal>
  );
};
