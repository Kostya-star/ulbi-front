import { memo, useCallback } from 'react';

import { ArticlesView } from '@/entities/Article';
import ViewBigIcon from '@/shared/assets/icons/view_list.svg';
import ViewSmallIcon from '@/shared/assets/icons/view_tile.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';
import { Icon } from '@/shared/ui/Icon';

import cls from './ArticlesViewSwitcher.module.scss';

interface ArticlesViewSwitcherProps {
  className?: string;
  view: ArticlesView;
  onViewClick?: (view: ArticlesView) => void;
}

const viewTypes = [
  {
    view: ArticlesView.SMALL,
    icon: ViewSmallIcon,
  },
  {
    view: ArticlesView.BIG,
    icon: ViewBigIcon,
  },
];

export const ArticlesViewSwitcher = memo(({ className, view, onViewClick }: ArticlesViewSwitcherProps) => {
  const onIconClick = useCallback(
    (view: ArticlesView) => () => {
      onViewClick?.(view);
    },
    [onViewClick],
  );

  // const onIconClick = (view: ArticlesView) => () => {
  //   onViewClick?.(view);
  // };
  return (
    <div className={classNames('', {}, [className])}>
      {viewTypes.map((viewType) => (
        <Button key={viewType.view} theme={ButtonTheme.CLEAR} onClick={onIconClick(viewType.view)}>
          <Icon Svg={viewType.icon} className={classNames('', { [cls.notSelected]: view !== viewType.view }, [className])} />
        </Button>
      ))}
    </div>
  );
});
