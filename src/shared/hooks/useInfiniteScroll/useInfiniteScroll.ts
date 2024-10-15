import { MutableRefObject, useEffect } from 'react';

interface UseInfiniteScrollargs {
  cb?: () => void;
  wrapperRef: MutableRefObject<HTMLElement>;
  triggerRef: MutableRefObject<HTMLElement>;
}

export const useInfiniteScroll = ({
  cb,
  wrapperRef,
  triggerRef,
}: UseInfiniteScrollargs) => {
  // const observer = useRef();

  useEffect(() => {
    let observer: IntersectionObserver | null = null;
    const trigger = triggerRef.current;

    if (cb) {
      const options = {
        root: wrapperRef.current,
        rootMargin: '0px',
        threshold: 1.0,
      };

      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          cb();
        }
      }, options);

      observer.observe(trigger);
    }

    return () => {
      observer?.unobserve(trigger);
    };
  }, [wrapperRef, triggerRef, cb]);
};
