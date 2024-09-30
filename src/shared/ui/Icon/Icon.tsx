import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './Icon.module.scss';

interface IconProps {
  className?: string;
  Svg: React.VFC<React.SVGProps<SVGSVGElement>>
  invertedColor?: boolean
}

export const Icon = memo(({ className, Svg, invertedColor }: IconProps) => {
  return (
    <Svg className={classNames(invertedColor ? cls.Iconinverted : cls.Icon, {}, [className])} />
  );
});
