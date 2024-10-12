import { useCallback, useRef } from 'react';

/**
 * Custom React hook that returns a debounced version of a callback function.
 * The callback will only be invoked after the specified delay time has passed
 * since the last time the debounced function was called.
 *
 * @param {Function} cb - The callback function to be debounced.
 * @param {number} delay - The delay in milliseconds to wait before invoking the callback.
 *
 * @returns {Function} A debounced version of the callback function that delays invoking
 * the callback until after the specified delay time has passed.
 *
 * @example
 * const handleResize = useDebounce(() => {
 *   console.log('Window resized');
 * }, 300);
 *
 * window.addEventListener('resize', handleResize);
 */

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
