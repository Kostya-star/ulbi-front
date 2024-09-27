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
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  lazy?: boolean;
  onClose?: () => void;
}

export const Modal: FC<ModalProps> = ({
  children, className, isOpen, lazy, onClose,
}) => {
  const { theme } = useTheme();

  if (lazy && !isOpen) return null;

  return (
    <Portal>
      <HStack
        justifyContent='center'
        alignItems='center'
        className={classNames(cls.Modal, { [cls.opened]: isOpen }, [className, theme])}
      >
        <Overlay onClick={onClose} />
        <div className={cls.content}>
          {children}
        </div>
      </HStack>
    </Portal>
  );
};
