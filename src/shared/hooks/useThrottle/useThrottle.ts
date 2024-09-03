import { useCallback, useRef } from 'react';

export const useThrottle = (cb: (...args: any[]) => void, delay: number) => {
  const isThrottleAllowed = useRef(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback((...args: any[]) => {
    if (isThrottleAllowed.current) {
      cb(...args);
      isThrottleAllowed.current = false;

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        isThrottleAllowed.current = true;
        timeoutRef.current = null;
      }, delay);
    }
  }, [delay, cb]);
};
