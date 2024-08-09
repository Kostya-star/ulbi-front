import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

interface TextProps {
  title?: string
  text?: string
  className?: string;
  theme?: TextTheme
}

export const Text = memo(({
  title, text, theme = TextTheme.PRIMARY, className,
}: TextProps) => {
  return (
    // @ts-ignore for now!!!!!!!!!!!!!!!!!!
    <div className={classNames('', {}, [className, cls[theme]])}>
      {title && <p className={cls.title}>{title}</p>}
      {text && <p className={cls.text}>{text}</p>}
    </div>
  );
});