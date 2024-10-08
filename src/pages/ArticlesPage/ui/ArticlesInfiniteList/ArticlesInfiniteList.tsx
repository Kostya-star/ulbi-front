import { memo } from 'react';

import { useSelector } from 'react-redux';

import { ArticlesList } from '@/entities/Article';

import { getIsLoading, getView } from '../../model/selectors/articlesPageSelectors';
import { getArticles } from '../../model/slices/articlesPageSlice';

export const ArticlesInfiniteList = memo(() => {
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getIsLoading);
  const view = useSelector(getView);

  return (
    <ArticlesList
      articles={articles}
      isLoading={isLoading}
      view={view}
    />
  );
});
