import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import {
  getHasMore, getIsLoading, getPage,
} from '../../selectors/articlesPageSelectors';
import { setPage } from '../../slices/articlesPageSlice';
import { fetchArticles } from '../fetchArticles/fetchArticles';

export const fetchNextArticlesPage = createAsyncThunk<void, void, ThunkConfig<string>>(
  'articles/fetchNextArticlesPage',
  async (_, { getState, dispatch }) => {
    const hasMore = getHasMore(getState());
    const isLoading = getIsLoading(getState());
    const page = getPage(getState());

    if (hasMore && !isLoading) {
      const newPage = page + 1;

      dispatch(fetchArticles());
      dispatch(setPage(newPage));
    }
  },
);
