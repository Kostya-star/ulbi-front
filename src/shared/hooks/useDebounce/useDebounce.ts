import { useCallback, useRef } from 'react';

export const useDebounce = (cb: (...args: any[]) => void, delay: number) => {
  const timeout = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: any[]) => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }

    timeout.current = setTimeout(() => {
      cb(...args);
    }, delay);
  }, [delay, cb]);
};
