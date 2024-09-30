import { CSSProperties, memo, useMemo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Avatar.module.scss';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
}

export const Avatar = memo(({
  src,
  alt,
  size = 100,
  className,
}: AvatarProps) => {
  const styles = useMemo<CSSProperties>(() => ({
    width: size,
    height: size,
  }), [size]);

  return (
    <img
      src={src}
      alt={alt}
      style={styles}
      className={classNames(cls.Avatar, {}, [className])}
    />
  );
});
