import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { getArticleDetailsData } from 'entities/Article/model/selectors/getArticleDetails/getArticleDetails';
import { Comment } from 'entities/Comment';
import { getAuthUserData } from 'entities/User';
import { fetchCommentsByArticleId } from '../fetchCommentsByArticleId/fetchCommentsByArticleId';

interface PayloadThunk {
  newComment: string;
  articleId: string;
}

export const addCommentForArticle = createAsyncThunk<Comment, PayloadThunk, ThunkConfig<string>>(
  'articleDetails/addCommentForArticle',
  async ({ newComment, articleId }, thunkApi) => {
    const {
      extra, dispatch, rejectWithValue, getState,
    } = thunkApi;

    // const article = getArticleDetailsData(getState());
    const userData = getAuthUserData(getState());

    const newComm = {
      text: newComment,
      articleId,
      userId: userData?.id,
    };

    try {
      const comment = await extra.api.post<Comment>('/comments', newComm);

      if (!comment.data) throw new Error();

      dispatch(fetchCommentsByArticleId(articleId));

      return comment.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
