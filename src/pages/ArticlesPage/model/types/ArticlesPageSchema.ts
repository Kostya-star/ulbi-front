import { EntityState } from '@reduxjs/toolkit';

import { Article, ArticleSortByOptions, ArticlesView, ArticleType } from '@/entities/Article';
import { SortOrder } from '@/shared/types/SortOrder';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading: boolean;
  error: string | null;

  // pagination
  page: number;
  limit: number | null;
  hasMore: boolean;

  // filters
  view: ArticlesView;
  sortBy: ArticleSortByOptions;
  order: SortOrder;
  search: string;
  type: ArticleType;
}
