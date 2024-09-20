import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Text.module.scss';

export enum TextTheme {
  PRIMARY = 'primary',
  ERROR = 'error'
}

export enum TextAlign {
  LEFT = 'left',
  RIGHT = 'right',
  CENTER = 'center',
}

export enum TextSize {
  S = 'size_s',
  M = 'size_m',
  L = 'size_l',
}

type HeaderTagType = 'h1' | 'h2' | 'h3';

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
  [TextSize.S]: 'h3',
  [TextSize.M]: 'h2',
  [TextSize.L]: 'h1',
};

interface TextProps {
  title?: string
  text?: string
  className?: string;
  theme?: TextTheme;
  align?: TextAlign;
  size?: TextSize;
  'data-testid'?: string;
}

export const Text = memo(({
  className,
  title,
  text,
  theme = TextTheme.PRIMARY,
  align = TextAlign.LEFT,
  size = TextSize.M,
  'data-testid': dataTestId = 'Text',
}: TextProps) => {
  const HeaderTag = mapSizeToHeaderTag[size];
  return (
    <div className={classNames('', {}, [className, cls[theme], cls[align], cls[size]])}>
      {title && (
        <HeaderTag
          className={cls.title}
          data-testid={`${dataTestId}.Header`}
        >
          {title}
        </HeaderTag>
      )}
      {text && (
        <p
          className={cls.text}
          data-testid={`${dataTestId}.Paragraph`}
        >
            {text}
        </p>
      )}
    </div>
  );
});
