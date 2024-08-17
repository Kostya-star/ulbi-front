import { Article } from './article';

export interface ArticleDetailsSchema {
  isLoading: boolean;
  error: string | null;
  data: Article | null;
}
