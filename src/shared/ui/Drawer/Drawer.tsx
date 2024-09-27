import { useTheme } from 'app/providers/ThemeProvider';
import { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

type Sides = 'left' | 'right' | 'bottom'

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  side?: Sides;
}

export const Drawer = memo(({
  className,
  children,
  isOpen = false,
  side = 'bottom',
  onClose,
}: DrawerProps) => {
  const { theme } = useTheme();

  return (
    <Portal>
      <div className={classNames(cls.Drawer, { [cls.opened]: isOpen }, [className, theme])}>
        <Overlay onClick={onClose} />
        <div className={classNames(cls.content, {}, [cls[side]])}>
          {children}
        </div>
      </div>
    </Portal>
  );
});
