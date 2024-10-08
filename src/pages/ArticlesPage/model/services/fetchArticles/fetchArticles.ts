import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article, ArticleType } from '@/entities/Article';
import { setQueryParams } from '@/shared/lib/url/handleQueryParams/handleQueryParams';

import {
  getLimit, getOrder, getPage, getSearch, getSortBy, getType,
} from '../../selectors/articlesPageSelectors';

interface FetchArticlesArgs {
  replace?: boolean;
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesArgs | undefined, ThunkConfig<string>>(
  'articles/fetchArticles',
  async (_, { extra, rejectWithValue, getState }) => {
    const limit = getLimit(getState());
    const page = getPage(getState());
    const order = getOrder(getState());
    const sort = getSortBy(getState());
    const search = getSearch(getState());
    const type = getType(getState());

    try {
      setQueryParams({
        page: String(page),
        order,
        sort,
        search,
        type,
      });
      const articles = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _page: page,
          _limit: limit,
          _order: order,
          _sort: sort,
          q: search,
          type: type === ArticleType.ALL ? undefined : type,
        },
      });

      if (!articles.data) throw new Error();

      return articles.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
