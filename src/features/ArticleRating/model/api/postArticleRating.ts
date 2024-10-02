import { rtkApi } from '@/shared/api/rtkApi';

interface PostArticleRatingArgs {
  userId: string;
  articleId: string;
  rate: number;
  feedback?: string;
}

const postRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    postArticleRating: build.mutation<void, PostArticleRatingArgs>({
      query: (body) => ({
        url: '/article-ratings',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['GetArticleRating'],
    }),
  }),
});

export const usePostArticleRating = postRatingApi.usePostArticleRatingMutation;
