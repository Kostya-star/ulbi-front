import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Article } from '@/entities/Article';

export const fetchArticleRecommendations = createAsyncThunk<
  Article[],
  void,
  ThunkConfig<string>
>(
  'articleDetails/fetchArticleRecommendations',
  async (_, { extra, rejectWithValue }) => {
    try {
      const articles = await extra.api.get<Article[]>('/articles', {
        params: {
          _limit: 4,
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
