import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import {
  ArticleSortByOptions, ArticlesView, ArticlesViewSwitcher, ArticleType, ArticleTypeTabs,
} from '@/entities/Article';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { SortOrder } from '@/shared/types/SortOrder';
import { Card } from '@/shared/ui/Card/Card';
import { Input } from '@/shared/ui/Input/Input';
import { Select, SelectOption } from '@/shared/ui/Select/Select';
import { useDebounce } from '@/shared/hooks/useDebounce/useDebounce';
import { ARTICLES_VIEW_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { HStack } from '@/shared/ui/Stack';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import {
  getOrder, getSearch, getSortBy, getType, getView,
} from '../../model/selectors/articlesPageSelectors';
import {
  setOrder, setPage, setSearch, setSortBy, setType, setView,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
}

const DEBOUNCED_SEARCH_DELAY = 400;

export const ArticlesPageFilters = memo(({ className }: ArticlesPageFiltersProps) => {
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();

  const sort = useSelector(getSortBy);
  const order = useSelector(getOrder);
  const search = useSelector(getSearch);
  const type = useSelector(getType);

  const view = useSelector(getView);

  const sortByOptions: SelectOption<ArticleSortByOptions>[] = useMemo(() => [
    {
      text: t('views'),
      value: ArticleSortByOptions.VIEWS,
    },
    {
      text: t('title'),
      value: ArticleSortByOptions.TITLE,
    },
    {
      text: t('createdAt'),
      value: ArticleSortByOptions.CREATED_AT,
    },
  ], [t]);

  const orderOptions: SelectOption<SortOrder>[] = useMemo(() => [
    {
      text: t('asc'),
      value: SortOrder.ASC,
    },
    {
      text: t('desc'),
      value: SortOrder.DESC,
    },
  ], [t]);

  const fetchData = useCallback(() => {
    dispatch(fetchArticles({ replace: true }));
  }, [dispatch]);

  const debouncedFetchBySearchHandler = useDebounce(fetchData, DEBOUNCED_SEARCH_DELAY);

  const onChangeSort = useCallback((newSort: ArticleSortByOptions) => {
    dispatch(setSortBy(newSort));
    dispatch(setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeOrder = useCallback((newOrder: SortOrder) => {
    dispatch(setOrder(newOrder));
    dispatch(setPage(1));
    fetchData();
  }, [dispatch, fetchData]);

  const onChangeSearch = useCallback((newSearch: string) => {
    dispatch(setSearch(newSearch));
    dispatch(setPage(1));
    debouncedFetchBySearchHandler();
  }, [debouncedFetchBySearchHandler, dispatch]);

  const onChangeView = useCallback((newView: ArticlesView) => {
    dispatch(setView(newView));
    localStorage.setItem(ARTICLES_VIEW_LOCAL_STORAGE, newView);
  }, [dispatch]);

  const onChangeType = useCallback((newType: string) => {
    dispatch(setType(newType as ArticleType));
    dispatch(setPage(1));
    fetchData();
  }, [fetchData, dispatch]);

  return (
    <div className={classNames('', {}, [className])}>
      <HStack
        justifyContent='between'
        alignItems='center'
        className={cls.header}
      >
        <HStack gap='16'>
          <Select<ArticleSortByOptions>
            label={t('sort_by')}
            options={sortByOptions}
            value={sort}
            onChange={onChangeSort}
          />
          <Select<SortOrder>
            label={t('order_by')}
            options={orderOptions}
            value={order}
            onChange={onChangeOrder}
          />
        </HStack>
        <ArticlesViewSwitcher
          view={view}
          onViewClick={onChangeView}
        />
      </HStack>
      <Card>
        <Input
          value={search}
          placeholder={t('search_articles')}
          onChange={onChangeSearch}
        />
      </Card>

      <ArticleTypeTabs
        tabClick={onChangeType}
        value={type}
      />
    </div>
  );
});
