import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticleBlockCodeComp.module.scss';

interface ArticleBlockCodeCompProps {
  className?: string;
}

export const ArticleBlockCodeComp = memo(({ className }: ArticleBlockCodeCompProps) => {
  return (
  <div className={classNames(cls.ArticleBlockCodeComp, {}, [className])}>
  </div>
);
})