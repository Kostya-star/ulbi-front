import { memo } from 'react';
import { useSelector } from 'react-redux';
import { ArticlesList } from '@/entities/Article';
import { getArticles } from '../../model/slices/articlesPageSlice';
import { getIsLoading, getView } from '../../model/selectors/articlesPageSelectors';

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
