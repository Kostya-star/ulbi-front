import {
  memo, ReactNode, useCallback, useEffect, useMemo,
} from 'react';
import { useTheme } from '@/app/providers/ThemeProvider';
import { classNames } from '@/shared/lib/classNames/classNames';
import { ReactSpringType, UseGestureType } from '@/shared/types/asyncAnimationLibs';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

type Sides = 'left' | 'right' | 'bottom'

interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  side?: Sides;
  onClose?: () => void;

  // async animation libs
  Gesture: UseGestureType;
  Spring: ReactSpringType;
}

export const Drawer = memo(({
  className,
  children,
  isOpen = false,
  side = 'bottom',
  onClose,
  Gesture,
  Spring,
}: DrawerProps) => {
  const { theme } = useTheme();

  const height = useMemo(() => window.innerHeight + (side === 'bottom' ? 100 : 0), [side]);

  const [{ y }, api] = Spring.useSpring(() => ({ y: height }));

  const openDrawer = useCallback(() => {
    api.start({ y: 0, immediate: false });
  }, [api]);

  useEffect(() => {
    if (isOpen) {
      openDrawer();
    }
  }, [api, isOpen, openDrawer]);

  const close = (velocity = 0) => {
    api.start({
      y: height,
      immediate: false,
      config: { ...Spring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = Gesture.useDrag(
    ({
      last,
      velocity: [, vy],
      direction: [, dy],
      movement: [, my],
      cancel,
    }) => {
      if (my < -70) cancel();

      if (last) {
        if (my > height * 0.5 || (vy > 0.5 && dy > 0)) {
          close();
        } else {
          openDrawer();
        }
      } else {
        api.start({ y: my, immediate: true });
      }
    },
    {
      from: () => [0, y.get()], filterTaps: true, bounds: { top: 0 }, rubberband: true,
    },
  );

  if (!isOpen) {
    return null;
  }

  const display = y.to((py) => (py < height ? 'block' : 'none'));

  return (
    <Portal>
      <div className={classNames(cls.Drawer, { [cls.opened]: isOpen }, [className, theme])}>
        <Overlay onClick={close} />
        <Spring.a.div
          className={classNames(cls.content, {}, [cls[side], cls.sheet])}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </Spring.a.div>
      </div>
    </Portal>
  );
});
