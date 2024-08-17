import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockImgComp.module.scss';

interface ArticleBlockImgCompProps {
  className?: string;
}

export const ArticleBlockImgComp = memo(({ className }: ArticleBlockImgCompProps) => {
  return (
  <div className={classNames(cls.ArticleBlockImgComp, {}, [className])}>
  </div>
);
})