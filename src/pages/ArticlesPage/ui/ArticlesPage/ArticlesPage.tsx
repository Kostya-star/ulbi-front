import {
  ArticlesList, ArticlesView,
} from 'entities/Article';
import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { ARTICLES_VIEW_LOCAL_STORAGE } from 'shared/const/localStorage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import {
  getError, getIsLoading, getView,
} from '../../model/selectors/articlesPageSelectors';
import {
  articlesPageReducer, getArticles, setView,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
  useReduxReducerManager(reducers, false);

  const dispatch = useAppDispatch();
  const articles = useSelector(getArticles.selectAll);
  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);
  const view = useSelector(getView);

  useConditionalEffect(() => {
    dispatch(initArticlesPage());
  }, [view, dispatch]);

  const onChangeView = useCallback((newView: ArticlesView) => {
    dispatch(setView(newView));
    localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE, newView);
  }, [dispatch]);

  const onFetchNextArticlesPage = useCallback(() => {
    dispatch(fetchNextArticlesPage());
  }, [dispatch]);

  if (error) {
    return (
      <Page className={classNames(cls.ArticlesPage, {}, [className])}>
        <Text text={error} theme={TextTheme.ERROR} align={TextAlign.CENTER} />
      </Page>
    );
  }

  return (
    <Page
      className={classNames(cls.ArticlesPage, {}, [className])}
      onScrollEnd={onFetchNextArticlesPage}
    >
      <ArticlesPageFilters
        view={view}
        onChangeView={onChangeView}
        className={cls.filters}
      />
      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        view={view}
      />
    </Page>
  );
});

export default ArticlesPage;
