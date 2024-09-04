import { ArticleSortByOptions, ArticlesView, ArticlesViewSwitcher } from 'entities/Article';
import { memo, useCallback, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { SortOrder } from 'shared/types/SortOrder';
import { Card } from 'shared/ui/Card/Card';
import { Input } from 'shared/ui/Input/Input';
import { Select, SelectOption } from 'shared/ui/Select/Select';
import { useDebounce } from 'shared/hooks/useDebounce/useDebounce';
import { fetchArticles } from '../../model/services/fetchArticles/fetchArticles';
import { getOrder, getSearch, getSortBy } from '../../model/selectors/articlesPageSelectors';
import {
  setOrder, setPage, setSearch, setSortBy,
} from '../../model/slices/articlesPageSlice';
import cls from './ArticlesPageFilters.module.scss';

interface ArticlesPageFiltersProps {
  className?: string;
  view: ArticlesView;
  onChangeView: (newView: ArticlesView) => void;
}

const DEBOUNCED_SEARCH_DELAY = 400;

export const ArticlesPageFilters = memo(({ className, view, onChangeView }: ArticlesPageFiltersProps) => {
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();

  const sort = useSelector(getSortBy);
  const order = useSelector(getOrder);
  const search = useSelector(getSearch);

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

  return (
    <div className={classNames('', {}, [className])}>
      <div className={cls.header}>
        <div className={cls.sort}>
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
        </div>
        <ArticlesViewSwitcher
          view={view}
          onViewClick={onChangeView}
        />
      </div>
      <Card>
        <Input
          value={search}
          placeholder={t('search_articles')}
          onChange={onChangeSearch}
        />
      </Card>
    </div>
  );
});
