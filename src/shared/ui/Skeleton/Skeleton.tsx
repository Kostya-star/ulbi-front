import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Skeleton.module.scss';

interface SkeletonProps {
  className?: string;
  height?: string | number
  width?: string | number
  borderRadius?: string
}

export const Skeleton = memo(({
  className,
  height,
  width,
  borderRadius,
}: SkeletonProps) => {
  const styles: CSSProperties = useMemo(() => ({
    height,
    width,
    borderRadius,
  }), [borderRadius, height, width]);

  return (
    <div
      style={styles}
      className={classNames(cls.Skeleton, {}, [className])}
    />
  );
});
