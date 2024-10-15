import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { Article } from '../../type/article';

export const fetchArticleById = createAsyncThunk<
  Article,
  string,
  ThunkConfig<string>
>('profile/fetchArticleById', async (articleId, { extra, rejectWithValue }) => {
  try {
    const article = await extra.api.get<Article>(`/articles/${articleId}`, {
      params: {
        _expand: 'user',
      },
    });

    if (!article.data) throw new Error();

    return article.data;
  } catch (err) {
    console.log(err);
    return rejectWithValue('error');
  }
});
