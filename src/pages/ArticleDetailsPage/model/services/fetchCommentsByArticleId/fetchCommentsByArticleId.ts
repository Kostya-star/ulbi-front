import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Comment } from '@/entities/Comment';

export const fetchCommentsByArticleId = createAsyncThunk<Comment[], string, ThunkConfig<string>>(
  'articleDetails/fetchCommentsByArticleId',
  async (articleId, { extra, rejectWithValue }) => {
    try {
      const comments = await extra.api.get<Comment[]>('/comments', {
        params: {
          articleId,
          _expand: 'user',
        },
      });

      if (!comments.data) throw new Error();

      return comments.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
