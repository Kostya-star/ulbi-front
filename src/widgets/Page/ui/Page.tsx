import { memo, MutableRefObject, ReactNode, UIEvent, useRef } from 'react';

import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import { getScrollPositionByPath, setScroll } from '@/features/scrollSave';
import { PAGE_ID } from '@/shared/const/pageId';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from '@/shared/hooks/useConditionalEffect/useConditionalEffect';
import { useInfiniteScroll } from '@/shared/hooks/useInfiniteScroll/useInfiniteScroll';
import { useThrottle } from '@/shared/hooks/useThrottle/useThrottle';
import { classNames } from '@/shared/lib/classNames/classNames';
import { TestProps } from '@/shared/types/tests';

import cls from './Page.module.scss';

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;

  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;

  const { pathname } = useLocation();

  const dispatch = useAppDispatch();
  const scrollPosition = useSelector((state: StateSchema) => getScrollPositionByPath(state, pathname));

  useInfiniteScroll({
    cb: onScrollEnd,
    wrapperRef,
    triggerRef,
  });

  useConditionalEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  }, [scrollPosition]);

  const onScrollPage = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      setScroll({
        path: pathname,
        position: e.currentTarget.scrollTop,
      }),
    );
  }, 150);

  return (
    <main
      data-testid={props['data-testid'] ?? 'Page'}
      ref={wrapperRef}
      className={classNames(cls.Page, {}, [className])}
      onScroll={onScrollPage}
      id={PAGE_ID}
    >
      {children}

      {onScrollEnd ? <div ref={triggerRef} className={cls.trigger} /> : null}
    </main>
  );
});
