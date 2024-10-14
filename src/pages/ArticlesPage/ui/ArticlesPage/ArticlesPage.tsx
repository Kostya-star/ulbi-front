import { memo, useCallback } from 'react';

import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useConditionalEffect } from '@/shared/hooks/useConditionalEffect/useConditionalEffect';
import { ReducersList, useReduxReducerManager } from '@/shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text, TextAlign, TextTheme } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './ArticlesPage.module.scss';
import { getError, getView } from '../../model/selectors/articlesPageSelectors';
import { fetchNextArticlesPage } from '../../model/services/fetchNextArticlesPage/fetchNextArticlesPage';
import { initArticlesPage } from '../../model/services/initArticlesPage/initArticlesPage';
import { articlesPageReducer } from '../../model/slices/articlesPageSlice';
import { ArticlesInfiniteList } from '../ArticlesInfiniteList/ArticlesInfiniteList';
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
      data-testid="ArticlesPage"
      className={classNames(cls.ArticlesPage, {}, [className])}
      onScrollEnd={onFetchNextArticlesPage}
    >
      <ArticlesPageFilters className={cls.filters} />
      <ArticlesInfiniteList />
    </Page>
  );
});

export default ArticlesPage;
