import { memo, ReactNode, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { TestProps } from '@/shared/types/tests';

import cls from './Flex.module.scss';

type JustifyContent = 'start' | 'center' | 'end' | 'between' | 'around';
type AlignItems = 'start' | 'center' | 'end' | 'normal';
type FlexDirection = 'row' | 'column';
type FlexGap = '2' | '4' | '8' | '16' | '32';

export interface FlexProps extends TestProps {
  className?: string;
  children?: ReactNode;
  justifyContent?: JustifyContent;
  alignItems?: AlignItems;
  flexDirection?: FlexDirection;
  gap?: FlexGap;
  allWidth?: boolean;
  tag?: keyof HTMLElementTagNameMap;
}

const justifyContentConst: Record<JustifyContent, string> = {
  start: cls.justifyContentStart,
  center: cls.justifyContentCenter,
  end: cls.justifyContentEnd,
  between: cls.justifyContentBetween,
  around: cls.justifyContentAround,
};

const alignItemsConst: Record<AlignItems, string> = {
  start: cls.alignItemsStart,
  center: cls.alignItemsCenter,
  end: cls.alignItemsEnd,
  normal: cls.alignItemsNormal,
};

const flexDirectionConst: Record<FlexDirection, string> = {
  row: cls.flexDirectionRow,
  column: cls.flexDirectionColumn,
};

const flexGapConst: Record<FlexGap, string> = {
  2: cls.gap2,
  4: cls.gap4,
  8: cls.gap8,
  16: cls.gap16,
  32: cls.gap32,
};

export const Flex = memo((props: FlexProps) => {
  const {
    className,
    children,
    justifyContent = 'start',
    alignItems = 'start',
    flexDirection = 'row',
    gap,
    allWidth,
    tag = 'div',
  } = props;

  const classNamesArr = useMemo(
    () => [
      className,
      justifyContentConst[justifyContent],
      alignItemsConst[alignItems],
      flexDirectionConst[flexDirection],
      gap && flexGapConst[gap],
    ],
    [alignItems, className, flexDirection, justifyContent, gap],
  );

  const mods = useMemo(
    () => ({
      [cls.allWidth]: allWidth,
    }),
    [allWidth],
  );

  const Tag = useMemo(() => tag, [tag]);

  return (
    // @ts-ignore
    <Tag data-testid={props['data-testid']} className={classNames(cls.Flex, mods, classNamesArr)}>
      {children}
    </Tag>
  );
});
