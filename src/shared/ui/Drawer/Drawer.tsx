import { useTheme } from 'app/providers/ThemeProvider';
import {
  memo, ReactNode, useCallback, useEffect, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useDrag } from '@use-gesture/react';
import { a, useSpring, config } from '@react-spring/web';
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

// const DRAWER_CONTENT_HEIGHT = window.innerHeight + 100;

// const height = DRAWER_CONTENT_HEIGHT;

export const Drawer = memo(({
  className,
  children,
  isOpen = false,
  side = 'bottom',
  onClose,
}: DrawerProps) => {
  const { theme } = useTheme();

  const height = useMemo(() => window.innerHeight + (side === 'bottom' ? 100 : 0), [side]);

  const [{ y }, api] = useSpring(() => ({ y: height }));

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
      config: { ...config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = useDrag(
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
        <a.div
          className={classNames(cls.content, {}, [cls[side], cls.sheet])}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </a.div>
      </div>
    </Portal>
  );
});
