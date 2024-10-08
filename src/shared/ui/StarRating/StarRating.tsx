import {
  memo, useCallback, useState,
} from 'react';

import StarIcon from '@/shared/assets/icons/Star.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './StarRating.module.scss';
import { Icon } from '../Icon/Icon';

interface StarRatingProps {
  className?: string;
  size?: number;
  selectedStars: number;
  onClickStar: (star: number) => void;
}

const stars = [1, 2, 3, 4, 5];

export const StarRating = memo(({
  className,
  size = 30,
  selectedStars,
  onClickStar,
}: StarRatingProps) => {
  const [hoveredStar, setHoveredStar] = useState(0);

  const onHover = useCallback((star: number) => () => {
    setHoveredStar(star);
  }, []);

  const onLeave = useCallback(() => {
    setHoveredStar(0);
  }, []);

  const onClick = useCallback((star: number) => () => {
    onClickStar(star);
  }, [onClickStar]);

  const getMods = useCallback((star: number) => ({
    [cls.hovered]: (selectedStars || hoveredStar) >= star,
  }), [hoveredStar, selectedStars]);

  return (
    <div className={classNames('', {}, [className])}>
      {stars.map((star) => (
        <Icon
          key={star}
          Svg={StarIcon}
          height={size}
          width={size}
          className={classNames(cls.Star, getMods(star), [className])}
          onMouseEnter={onHover(star)}
          onMouseLeave={onLeave}
          onClick={onClick(star)}
        />
      ))}
    </div>
  );
});
