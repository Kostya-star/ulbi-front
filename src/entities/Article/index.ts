export { ArticleDetails } from './ui/ArticleDetails/ArticleDetails';

export {
  ArticleBlockType, ArticleType, ArticlesView, ArticleSortByOptions,
} from './model/const/article';

export type { Article } from './model/type/article';

export type { ArticleDetailsSchema } from './model/type/articleDetailsSchema';
export { ArticlesList } from './ui/ArticlesList/ArticlesList';
export { ArticlesViewSwitcher } from './ui/ArticlesViewSwitcher/ArticlesViewSwitcher';
export { ArticleTypeTabs } from './ui/ArticleTypeTabs/ArticleTypeTabs';
export { getArticleDetailsData } from './model/selectors/getArticleDetails/getArticleDetails';
export { articleDetailsReducer } from './model/slice/articleDetailsSlice';
