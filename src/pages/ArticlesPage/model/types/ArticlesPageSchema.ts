import { EntityState } from '@reduxjs/toolkit';
import { Article, ArticlesView } from 'entities/Article';

export interface ArticlesPageSchema extends EntityState<Article> {
  isLoading: boolean;
  error: string | null;
  // articles: Article[];
  view: ArticlesView;

  // pagination
  page: number;
  limit: number | null;
  hasMore: boolean;
}
