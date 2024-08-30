import {
  createEntityAdapter, createSlice, EntityAdapter, EntityState, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article, ArticlesView } from 'entities/Article';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';
import { ArticlesPageSchema } from '../types/articlesPageSchema';

type InitialState = EntityState<Article> & ArticlesPageSchema

const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const initialState: InitialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
  error: null,
  isLoading: false,
  entities: {},
  ids: [],
  view: ArticlesView.SMALL,
  page: 1,
  limit: null,
  hasMore: true,
});

const articlesPageSlice = createSlice({
  name: 'articlesPage',
  initialState,
  reducers: {
    setView: (state, action: PayloadAction<ArticlesView>) => {
      state.view = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setLimit: (state, action: PayloadAction<number>) => {
      state.limit = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchArticles.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchArticles.fulfilled, (state, action) => {
      const articles = action.payload;

      state.isLoading = false;
      state.error = null;
      articlesAdapter.addMany(state, articles);
      state.hasMore = !!articles.length;
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const articlesPageReducer = articlesPageSlice.reducer;
export const { setView, setPage, setLimit } = articlesPageSlice.actions;

// selectors
export const getArticles = articlesAdapter.getSelectors<StateSchema>((state) => {
  return state.articlesPage || articlesAdapter.getInitialState();
});
