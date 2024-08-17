import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockTextComp.module.scss';

interface ArticleBlockTextCompProps {
  className?: string;
}

export const ArticleBlockTextComp = memo(({ className }: ArticleBlockTextCompProps) => {
  return (
  <div className={classNames(cls.ArticleBlockTextComp, {}, [className])}>
  </div>
);
})