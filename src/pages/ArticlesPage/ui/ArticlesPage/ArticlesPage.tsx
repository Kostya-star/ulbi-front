import { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { ReducersList, useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Page } from 'widgets/Page';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { getError, getView } from '../../model/selectors/articlesPageSelectors';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPage.module.scss';
import { ArticlesPageFilters } from '../ArticlesPageFilters/ArticlesPageFilters';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';

interface ArticlesPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articlesPage: articlesPageReducer,
};

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
  useReduxReducerManager(reducers, false);

  const dispatch = useAppDispatch();
  const error = useSelector(getError);
  const view = useSelector(getView);

  useConditionalEffect(() => {
    dispatch(initArticlesPage());
  }, [view, dispatch]);

  const onFetchNextArticlesPage = useCallback(() => {
    if (__PROJECT__ !== 'storybook') {
      dispatch(fetchNextArticlesPage());
    }
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
      <ArticlesPageFilters className={cls.filters} />
      <ArticlesInfiniteList />
    </Page>
  );
});

export default ArticlesPage;
