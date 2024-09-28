import { useTheme } from 'app/providers/ThemeProvider';
import {
  memo, ReactNode, useCallback, useEffect, useMemo, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Overlay } from '../Overlay/Overlay';
import { Portal } from '../Portal/Portal';
import cls from './Drawer.module.scss';

type UseGestureType = typeof import('@use-gesture/react')
type ReactSpringType = typeof import('@react-spring/web')

type Sides = 'left' | 'right' | 'bottom'

interface DrawerContentProps {
  // animation libs
  useGesture: UseGestureType;
  reactSpring: ReactSpringType;

  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  side?: Sides;
  onClose?: () => void;
}

export const DrawerContent = memo(({
  useGesture,
  reactSpring,
  className,
  children,
  isOpen = false,
  side = 'bottom',
  onClose,
}: DrawerContentProps) => {
  const { theme } = useTheme();

  const height = useMemo(() => window.innerHeight + (side === 'bottom' ? 100 : 0), [side]);

  const [{ y }, api] = reactSpring.useSpring(() => ({ y: height }));

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
      config: { ...reactSpring.config.stiff, velocity },
      onResolve: onClose,
    });
  };

  const bind = useGesture.useDrag(
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
        <reactSpring.a.div
          className={classNames(cls.content, {}, [cls[side], cls.sheet])}
          style={{ display, bottom: `calc(-100vh + ${height - 100}px)`, y }}
          {...bind()}
        >
          {children}
        </reactSpring.a.div>
      </div>
    </Portal>
  );
});

// DRAWER WRAPPER
interface DrawerProps {
  className?: string;
  children: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  side?: Sides;
}

export const Drawer = memo((props: DrawerProps) => {
  const [useGesture, setUseGesture] = useState<UseGestureType | null>(null);
  const [reactSpring, setReactSpring] = useState<ReactSpringType | null>(null);

  useEffect(() => {
    async function loadLibs() {
      const { useGesture, reactSpring } = await loadLibsAsync();
      setUseGesture(useGesture);
      setReactSpring(reactSpring);
    }

    loadLibs();
  }, []);

  if (!useGesture || !reactSpring) return null;

  return (
    <DrawerContent
      useGesture={useGesture}
      reactSpring={reactSpring}
      {...props}
    />
  );
});

async function loadLibsAsync() {
  //   import { useDrag } from '@use-gesture/react';
  // import { a, useSpring, config } from '@react-spring/web';

  const useGesturePromise = import('@use-gesture/react');
  const reactSpringPromise = import('@react-spring/web');
  const [useGesture, reactSpring] = await Promise.all([useGesturePromise, reactSpringPromise]);

  return { useGesture, reactSpring };
}
