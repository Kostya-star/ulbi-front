import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { ArticleSortByOptions, ArticlesView, ArticleType } from '@/entities/Article';
import { ARTICLES_VIEW_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { parseQueryParams } from '@/shared/lib/url/handleQueryParams/handleQueryParams';
import { SortOrder } from '@/shared/types/SortOrder';
import { BIG_VIEW_LIMIT, SMALL_VIEW_LIMIT } from '../../const/articlesLimit/articlesLimit';
import {
  setLimit, setOrder, setPage, setSearch, setSortBy, setType, setView,
} from '../../slices/articlesPageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const initArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articles/initArticlesPage',
  async (_, { dispatch }) => {
    const lsView = localStorage.getItem(ARTICLES_VIEW_LOCAL_STORAGE) || ArticlesView.SMALL;
    const limit = lsView === ArticlesView.SMALL ? SMALL_VIEW_LIMIT : BIG_VIEW_LIMIT;

    dispatch(setView(lsView as ArticlesView));
    dispatch(setLimit(limit));

    // process url params
    const urlParams = parseQueryParams();

    const page = urlParams.get('page') || 1;
    const sort = urlParams.get('sort') || ArticleSortByOptions.VIEWS;
    const order = urlParams.get('order') || SortOrder.ASC;
    const search = urlParams.get('search') || '';
    const type = urlParams.get('type') || ArticleType.ALL;

    dispatch(setPage(Number(page)));
    dispatch(setSortBy(sort as ArticleSortByOptions));
    dispatch(setOrder(order as SortOrder));
    dispatch(setSearch(search));
    dispatch(setType(type as ArticleType));

    dispatch(fetchArticles());
  },
);
