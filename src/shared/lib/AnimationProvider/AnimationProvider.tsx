import {
  ReactElement, useEffect, useRef, useState,
} from 'react';
import { ReactSpringType, UseGestureType } from 'shared/types/asyncAnimationLibs';

interface AsyncLibs {
  Gesture: UseGestureType;
  Spring: ReactSpringType;
}

interface AnimationProviderProps {
  children: (libs: AsyncLibs) => ReactElement;
}

export function AnimationProvider({ children }: AnimationProviderProps) {
  const Gesture = useRef<UseGestureType | null>(null);
  const Spring = useRef<ReactSpringType | null>(null);
  const [isLibsLoaded, setLibsLoaded] = useState(false);

  useEffect(() => {
    async function loadLibs() {
      const { useGesture, reactSpring } = await loadLibsAsync();
      Gesture.current = useGesture;
      Spring.current = reactSpring;
      setLibsLoaded(true);
    }

    loadLibs();
  }, []);

  if (!isLibsLoaded || !Gesture.current || !Spring.current) return null;

  return children({
    Gesture: Gesture.current,
    Spring: Spring.current,
  });
}

async function loadLibsAsync() {
  // import { useDrag } from '@use-gesture/react';
  // import { a, useSpring, config } from '@react-spring/web';

  const gesturePromise = import('@use-gesture/react');
  const springPromise = import('@react-spring/web');
  const [useGesture, reactSpring] = await Promise.all([gesturePromise, springPromise]);

  return { useGesture, reactSpring };
}
