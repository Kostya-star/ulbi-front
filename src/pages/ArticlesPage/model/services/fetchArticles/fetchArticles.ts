import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';

export const fetchArticles = createAsyncThunk<Article[], undefined, ThunkConfig<string>>(
  'articles/fetchArticles',
  async (_, { extra, rejectWithValue }) => {
    try {
      const articles = await extra.api.get<Article[]>('/articles', {
        params: {
          _expand: 'user',
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
