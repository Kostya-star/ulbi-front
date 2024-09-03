import { StateSchema } from 'app/providers/StoreProvider';
import { getScrollPositionByPath, setScroll } from 'features/scrollSave';
import {
  memo, MutableRefObject, ReactNode, UIEvent, useCallback, useEffect, useRef,
} from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { useInfiniteScroll } from 'shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from 'shared/hooks/useThrottle/useThrottle';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Page.module.scss';

interface PageProps {
  className?: string;
  children: ReactNode
  onScrollEnd?: () => void;
}

export const Page = memo(({ className, children, onScrollEnd }: PageProps) => {
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const scrollPosition = useSelector(
    (state: StateSchema) => getScrollPositionByPath(state, pathname),
  );

  useInfiniteScroll({
    cb: onScrollEnd,
    wrapperRef,
    triggerRef,
  });

  useConditionalEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition]);

  const onScrollPage = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(setScroll({
      path: pathname,
      position: e.currentTarget.scrollTop,
    }));
  }, 150);

  return (
    <div
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScrollPage}
    >
      {children}

      <div ref={triggerRef} />
    </div>
  );
});
