import {
  createEntityAdapter, createSlice, EntityAdapter, EntityState, PayloadAction,
} from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';
import {
  Article, ArticleSortByOptions, ArticlesView, ArticleType,
} from 'entities/Article';
import { SortOrder } from 'shared/types/SortOrder';
import { BIG_VIEW_LIMIT } from '../const/articlesLimit/articlesLimit';
import { fetchArticles } from '../services/fetchArticles/fetchArticles';
import { ArticlesPageSchema } from '../types/ArticlesPageSchema';

type InitialState = EntityState<Article> & ArticlesPageSchema

const articlesAdapter: EntityAdapter<Article> = createEntityAdapter<Article>({
  selectId: (article) => article.id,
});

const initialState: InitialState = articlesAdapter.getInitialState<ArticlesPageSchema>({
  error: null,
  isLoading: false,
  entities: {},
  ids: [],
  page: 1,
  limit: null,
  hasMore: true,

  view: ArticlesView.SMALL,
  order: SortOrder.ASC,
  sortBy: ArticleSortByOptions.VIEWS,
  search: '',
  type: ArticleType.ALL,
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
    setOrder: (state, action: PayloadAction<SortOrder>) => {
      state.order = action.payload;
    },
    setSortBy: (state, action: PayloadAction<ArticleSortByOptions>) => {
      state.sortBy = action.payload;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setType: (state, action: PayloadAction<ArticleType>) => {
      state.type = action.payload;
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
      state.hasMore = articles.length >= (state.limit || BIG_VIEW_LIMIT);

      if (action.meta.arg?.replace) {
        articlesAdapter.setAll(state, articles);
      } else {
        articlesAdapter.addMany(state, articles);
      }
    });
    builder.addCase(fetchArticles.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

export const articlesPageReducer = articlesPageSlice.reducer;

export const {
  setView, setPage, setLimit, setOrder, setSortBy, setSearch, setType,
} = articlesPageSlice.actions;

// selectors
export const getArticles = articlesAdapter.getSelectors<StateSchema>((state) => {
  return state.articlesPage || articlesAdapter.getInitialState();
});
