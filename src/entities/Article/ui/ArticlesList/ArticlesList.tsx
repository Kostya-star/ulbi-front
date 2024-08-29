import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Article, ArticlesView } from '../../model/type/article';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import { ArticlesListItemSkeleton } from '../ArticlesListItem/ArticlesListItemSkeleton';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
  className?: string;
  articles?: Article[];
  isLoading: boolean;
  view: ArticlesView
}

const getSkeletons = (view: ArticlesView) => {
  return new Array(view === ArticlesView.SMALL ? 9 : 3).fill(0).map((_, ind) => (
    <ArticlesListItemSkeleton view={view} key={ind} />
  ));
};

export const ArticlesList = memo(({
  className, articles, isLoading, view = ArticlesView.SMALL,
}: ArticlesListProps) => {
  const renderArticle = useCallback((article: Article) => (
    <ArticlesListItem
      key={article.id}
      article={article}
      view={view}
    />
  ), [view]);

  if (isLoading) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        {getSkeletons(view)}
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {
        articles?.length
          ? articles.map(renderArticle)
          : null
      }
    </div>
  );
});
