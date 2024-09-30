import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code/Code';
import { ArticleBlockCode } from '../../model/type/article';
import cls from './ArticleBlockCodeComp.module.scss';

interface ArticleBlockCodeCompProps {
  className?: string;
  block: ArticleBlockCode
}

export const ArticleBlockCodeComp = memo(({ className, block }: ArticleBlockCodeCompProps) => {
  return (
    <div className={classNames(cls.ArticleBlockCodeComp, {}, [className])}>
      <Code textCode={block.code} />
    </div>
  );
});
