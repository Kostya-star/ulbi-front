import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Code } from '@/shared/ui/Code';

import cls from './ArticleBlockCodeComp.module.scss';
import { ArticleBlockCode } from '../../model/type/article';

interface ArticleBlockCodeCompProps {
  className?: string;
  block: ArticleBlockCode;
}

export const ArticleBlockCodeComp = memo(
  ({ className, block }: ArticleBlockCodeCompProps) => {
    return (
      <div className={classNames(cls.ArticleBlockCodeComp, {}, [className])}>
        <Code textCode={block.code} />
      </div>
    );
  },
);
