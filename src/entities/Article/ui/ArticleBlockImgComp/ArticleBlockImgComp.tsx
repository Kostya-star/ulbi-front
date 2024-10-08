import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign } from '@/shared/ui/Text';
import { ArticleBlockImg } from '../../model/type/article';
import cls from './ArticleBlockImgComp.module.scss';

interface ArticleBlockImgCompProps {
  className?: string;
  block: ArticleBlockImg
}

export const ArticleBlockImgComp = memo(({ block, className }: ArticleBlockImgCompProps) => {
  return (
    <div className={classNames(cls.ArticleBlockImgComp, {}, [className])}>
      <img
        className={cls.img}
        src={block.src}
        alt={block.title}
      />
      {
        block.title && (
          <Text text={block.title} align={TextAlign.CENTER} />
        )
      }
    </div>
  );
});
