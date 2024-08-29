import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { getLimit } from '../../selectors/articlesPageSelectors';

interface FetchArticlesArgs {
  page: number
}

export const fetchArticles = createAsyncThunk<Article[], FetchArticlesArgs, ThunkConfig<string>>(
  'articles/fetchArticles',
  async ({ page = 1 }, { extra, rejectWithValue, getState }) => {
    const limit = getLimit(getState());
    try {
      const articles = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
          _page: page,
          _limit: limit,
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
