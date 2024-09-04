import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { setQueryParams } from 'shared/lib/url/handleQueryParams/handleQueryParams';
import {
  getLimit, getOrder, getPage, getSearch, getSortBy,
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

    try {
      setQueryParams({
        page: String(page),
        order,
        sort,
        search,
      });
      const articles = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _page: page,
          _limit: limit,
          _order: order,
          _sort: sort,
          q: search,
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
