import { memo, ReactNode } from 'react';

import { Link, LinkProps } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './AppLink.module.scss';

export enum AppLinkTheme {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
}

interface AppLinkProps extends LinkProps {
  className?: string;
  theme?: AppLinkTheme;
  children?: ReactNode;
}

export const AppLink = memo(
  ({
    className,
    children,
    to,
    theme = AppLinkTheme.PRIMARY,
    ...otherProps
  }: AppLinkProps) => {
    return (
      <Link
        className={classNames(cls.AppLink, {}, [className, cls[theme]])}
        to={to}
        {...otherProps}
      >
        {children}
      </Link>
    );
  },
);
