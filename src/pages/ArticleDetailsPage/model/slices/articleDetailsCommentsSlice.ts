import {
  createEntityAdapter, createSlice, EntityAdapter, EntityState,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Comment } from 'entities/Comment';
import { fetchCommentsByArticleId } from '../services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { ArticleDetailsCommentSchema } from '../types/ArticleDetailsCommentSchema';

type InitialState = EntityState<Comment> & ArticleDetailsCommentSchema

const commentsAdapter: EntityAdapter<Comment> = createEntityAdapter<Comment>({
  selectId: (comment) => comment.id,
});

const initialState: InitialState = commentsAdapter.getInitialState<ArticleDetailsCommentSchema>({
  error: null,
  isLoading: false,
  entities: {},
  ids: [],
});

const articleDetailsCommentsSlice = createSlice({
  name: 'articleDetailsComments',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCommentsByArticleId.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCommentsByArticleId.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      commentsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchCommentsByArticleId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const articleDetailsCommentsReducer = articleDetailsCommentsSlice.reducer;
// export const {} = articleDetailsCommentsSlice.actions;

// selectors
export const getArticleComments = commentsAdapter.getSelectors<StateSchema>((state) => {
  return state.articleDetailsComments || commentsAdapter.getInitialState();
});
