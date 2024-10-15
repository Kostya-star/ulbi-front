import { CSSProperties, memo, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Avatar.module.scss';
import UserAvatarEmpty from '../../assets/icons/user_avatar_empty.svg';
import { AppImage } from '../AppImage/AppImage';
import { Icon } from '../Icon';
import { Skeleton } from '../Skeleton';

interface AvatarProps {
  className?: string;
  src?: string;
  alt?: string;
  size?: number;
  fallbackInverted?: boolean;
}

export const Avatar = memo(
  ({ src, alt, size = 100, fallbackInverted, className }: AvatarProps) => {
    const styles = useMemo<CSSProperties>(
      () => ({
        width: size,
        height: size,
      }),
      [size],
    );

    const loadingFallback = useMemo(
      () => <Skeleton width={size} height={size} borderRadius="50%" />,
      [size],
    );
    const errorFallback = useMemo(() => {
      return (
        <Icon
          invertedColor={fallbackInverted}
          width={size}
          height={size}
          Svg={UserAvatarEmpty}
        />
      );
    }, [fallbackInverted, size]);

    return (
      <AppImage
        src={src}
        alt={alt}
        style={styles}
        fallbackLoading={loadingFallback}
        fallbackError={errorFallback}
        className={classNames(cls.Avatar, {}, [className])}
      />
    );
  },
);
