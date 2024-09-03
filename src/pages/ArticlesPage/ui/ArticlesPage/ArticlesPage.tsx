import { ArticlesList, ArticlesView, ArticlesViewSwitcher } from 'entities/Article';
import {
  memo, useCallback, useEffect, useMemo,
} from 'react';
import { useSelector } from 'react-redux';
import { ARTICLES_VIEW_LOCAL_STORAGE } from 'shared/const/localStorage';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'shared/ui/Page/Page';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { BIG_VIEW_LIMIT, SMALL_VIEW_LIMIT } from '../../model/const/articlesLimit/articlesLimit';
import {
  getError, getIsLoading, getView,
} from '../../model/selectors/articlesPageSelectors';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import {
  articlesPageReducer, getArticles, setLimit, setView,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';

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
    const lsView = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE) || ArticlesView.SMALL;
    const limit = lsView === ArticlesView.SMALL ? SMALL_VIEW_LIMIT : BIG_VIEW_LIMIT;

    dispatch(setView(lsView as ArticlesView));
    dispatch(setLimit(limit));

    dispatch(fetchArticles());
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
      <ArticlesViewSwitcher view={view} onViewClick={onChangeView} />
      <ArticlesList
        articles={articles}
        isLoading={isLoading}
        view={view}
      />
    </Page>
  );
});

export default ArticlesPage;
