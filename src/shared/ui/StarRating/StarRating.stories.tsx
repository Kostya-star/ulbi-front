import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './StarRating.module.scss';

interface StarRatingProps {
  className?: string;
}

export const StarRating = memo(({ className }: StarRatingProps) => {
  return (
  <div className={classNames(cls.StarRating, {}, [className])}>
  </div>
);
})