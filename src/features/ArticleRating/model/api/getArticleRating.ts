import { rtkApi } from '@/shared/api/rtkApi';
import { ArticleRating } from '../type/ArticleRating';

interface GetArticleRatingArgs {
  userId: string;
  articleId: string;
}

const getRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    getArticleRating: build.query<ArticleRating[], GetArticleRatingArgs>({
      query: (params) => ({
        url: '/article-ratings',
        params,
      }),
      providesTags: ['GetArticleRating'],
    }),
  }),
});

export const useGetArticleRating = getRatingApi.useGetArticleRatingQuery;
