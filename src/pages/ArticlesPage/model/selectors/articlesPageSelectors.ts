import { StateSchema } from '@/app/providers/StoreProvider';
import { ArticleSortByOptions, ArticlesView, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/SortOrder';

import { SMALL_VIEW_LIMIT } from '../const/articlesLimit/articlesLimit';

export const getIsLoading = (state: StateSchema) => state.articlesPage?.isLoading || false;
export const getError = (state: StateSchema) => state.articlesPage?.error;
export const getPage = (state: StateSchema) => state.articlesPage?.page || 1;
export const getLimit = (state: StateSchema) => state.articlesPage?.limit || SMALL_VIEW_LIMIT;
export const getHasMore = (state: StateSchema) => state.articlesPage?.hasMore;
export const getView = (state: StateSchema) => state.articlesPage?.view || ArticlesView.SMALL;
export const getOrder = (state: StateSchema) => state.articlesPage?.order || SortOrder.ASC;
export const getSortBy = (state: StateSchema) => state.articlesPage?.sortBy || ArticleSortByOptions.VIEWS;
export const getSearch = (state: StateSchema) => state.articlesPage?.search || '';
export const getType = (state: StateSchema) => state.articlesPage?.type || ArticleType.ALL;
