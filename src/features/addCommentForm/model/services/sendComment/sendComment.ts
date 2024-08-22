import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetails/getArticleDetails';
import { Comment } from 'entities/Comment';
import { getAuthUserData } from 'entities/User';

interface PayloadThunk {
  newComment: string;
  articleId?: string;
}

export const sendComment = createAsyncThunk<Comment, PayloadThunk, ThunkConfig<string>>(
  'addCommentForm/sendComment',
  async ({ newComment, articleId }, thunkApi) => {
    const {
      extra, dispatch, rejectWithValue, getState,
    } = thunkApi;

    // const article = getArticleDetailsData(getState());
    const userData = getAuthUserData(getState());

    const newComm = {
      text: newComment,
      ...(articleId ? { articleId } : {}),
      userId: userData?.id,
    };

    try {
      const comment = await extra.api.post<Comment>('/comments', newComm);

      if (!comment.data) throw new Error();

      return comment.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
