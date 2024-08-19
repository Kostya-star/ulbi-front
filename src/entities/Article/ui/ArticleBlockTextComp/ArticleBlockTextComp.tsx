import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { ArticleBlockText } from '../../model/type/article';
import cls from './ArticleBlockTextComp.module.scss';

interface ArticleBlockTextCompProps {
  className?: string;
  block: ArticleBlockText
}

export const ArticleBlockTextComp = memo(({ className, block }: ArticleBlockTextCompProps) => {
  return (
    <div className={classNames(cls.ArticleBlockTextComp, {}, [className])}>
      {block.title && <Text title={block.title} />}
      {block.paragraphs.map((p) => <Text key={p} text={p} />)}
    </div>
  );
});
