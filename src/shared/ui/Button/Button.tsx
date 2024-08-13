import { ButtonHTMLAttributes, memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Button.module.scss';

export enum ButtonTheme {
  CLEAR = 'clear',
  CLEAR_INVERTED = 'clearInverted',
  OUTLINE = 'outline',
  OUTLINE_RED = 'outline_red',
  BACKGROUND = 'background',
  BACKGROUND_INVERTED = 'backgroundInverted',
}

export enum ButtonSize {
  M = 'size_m',
  L = 'size_l',
  XL = 'size_xl'
}

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  square?: boolean;
  size?: ButtonSize;
  disabled?: boolean;
  children?: ReactNode;
}

export const Button = memo(({
  className,
  children,
  theme = ButtonTheme.OUTLINE,
  square,
  size = ButtonSize.M,
  disabled,
  ...rest
}: ButtonProps) => {
  const mods = {
    [cls.square]: square,
    [cls.disabled]: disabled,
  };

  const additionalCls = [className, cls[theme], cls[size]];

  return (
    <button
      type='button'
      className={classNames(cls.Button, mods, additionalCls)}
      {...rest}
    >
      {children}
    </button>
  );
});
