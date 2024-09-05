import {
  createEntityAdapter, createSlice, EntityAdapter, EntityState,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import { Article } from 'entities/Article';
import { fetchArticleRecommendations } from '../services/fetchArticleRecommendations/fetchArticleRecommendations';
import { ArticleDetailsRecommendationsSchema } from '../types/ArticleDetailsRecommendationsSchema';

type InitialState = EntityState<Article> & ArticleDetailsRecommendationsSchema

const recommendationsAdapter: EntityAdapter<Article> = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const initialState: InitialState = recommendationsAdapter.getInitialState<ArticleDetailsRecommendationsSchema>({
  error: null,
  isLoading: false,
  entities: {},
  ids: [],
});

const articleDetailsRecommendationsSlice = createSlice({
  name: 'articleDetailsRecommendations',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchArticleRecommendations.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchArticleRecommendations.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      recommendationsAdapter.setAll(state, action.payload);
    });
    builder.addCase(fetchArticleRecommendations.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const articleDetailsRecommendationsReducer = articleDetailsRecommendationsSlice.reducer;
// export const {} = articleDetailsRecommendationsSlice.actions;

// selectors
export const getArticleRecommendations = recommendationsAdapter.getSelectors<StateSchema>((state) => {
  return state.articleDetailsPage?.recommendations || recommendationsAdapter.getInitialState();
});
