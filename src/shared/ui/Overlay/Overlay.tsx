import { memo, useCallback } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Overlay.module.scss';

interface OverlayProps {
  className?: string;
  onClick?: () => void;
}

export const Overlay = memo(({ className, onClick }: OverlayProps) => {
  const onClickOverlay = useCallback(() => {
    onClick?.();
  }, [onClick]);

  return (
    <div className={classNames(cls.Overlay, {}, [className])} onClick={onClickOverlay} />
  );
});
