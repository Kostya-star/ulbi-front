import { StateSchema } from 'app/providers/StoreProvider';
import { ArticlesView } from 'entities/Article';
import { SMALL_VIEW_LIMIT } from '../const/articlesLimit/articlesLimit';

export const getIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const getError = (state: StateSchema) => state.articlesPage?.error;
export const getView = (state: StateSchema) => state.articlesPage?.view || ArticlesView.SMALL;
export const getPage = (state: StateSchema) => state.articlesPage?.page || 1;
export const getLimit = (state: StateSchema) => state.articlesPage?.limit || SMALL_VIEW_LIMIT;
export const getHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
