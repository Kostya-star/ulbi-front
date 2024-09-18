import { ArticlesView } from 'entities/Article';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { fetchArticles } from '../fetchArticles/fetchArticles';
import { fetchNextArticlesPage } from '../fetchNextArticlesPage/fetchNextArticlesPage';

jest.mock('pages/ArticlesPage/model/services/fetchArticles/fetchArticles');

describe('fetchNextArticlesPage.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        ids: [],
        entities: {},
        error: null,
        hasMore: true,
        isLoading: false,
        limit: 9,
        page: 1,
        view: ArticlesView.SMALL,
      },
    });
    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(4);
    expect(fetchArticles).toHaveBeenCalled();
  });

  test('request not called', async () => {
    const thunk = new TestAsyncThunk(fetchNextArticlesPage, {
      articlesPage: {
        ids: [],
        entities: {},
        error: null,
        hasMore: false,
        isLoading: false,
        limit: 9,
        page: 1,
        view: ArticlesView.SMALL,
      },
    });
    await thunk.callThunk();

    expect(thunk.dispatch).toBeCalledTimes(2);
    expect(fetchArticles).not.toHaveBeenCalled();
  });
});
