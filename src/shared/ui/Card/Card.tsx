import { HTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Card.module.scss';

export enum CardTheme {
  NORMAL = 'normal',
  OUTLINE = 'outline'
}

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
  children: ReactNode
  theme?: CardTheme
  disabled?: boolean;
}

export const Card = memo(({
  className,
  children,
  disabled,
  theme = CardTheme.NORMAL,
  ...otherProps
}: CardProps) => {
  return (
    <div
      className={classNames(cls.Card, { [cls.disabled]: disabled }, [className, cls[theme]])}
      {...otherProps}
    >
      {children}
    </div>
  );
});
