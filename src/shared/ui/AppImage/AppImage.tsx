import {
  ImgHTMLAttributes, memo, ReactElement, useLayoutEffect, useState,
} from 'react';

interface AppImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  className?: string;
  fallbackLoading?: ReactElement;
  fallbackError?: ReactElement;
}

export const AppImage = memo(({
  className,
  fallbackLoading,
  fallbackError,
  src,
  alt = 'some image should be here...',
  ...otherProps
}: AppImageProps) => {
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);

  useLayoutEffect(() => {
    const image = new Image();
    image.src = src ?? '';

    image.onloadstart = () => {
      setLoading(true);
      setError(false);
    };

    image.onload = () => {
      setLoading(false);
      setError(false);
    };

    image.onerror = () => {
      setLoading(false);
      setError(true);
    };
  }, [src]);

  if (isLoading && fallbackLoading) {
    return fallbackLoading;
  }

  if (!isError && fallbackError) {
    return fallbackError;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      {...otherProps}
    />
  );
});
