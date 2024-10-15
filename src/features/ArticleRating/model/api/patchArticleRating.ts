import { rtkApi } from '@/shared/api/rtkApi';

interface PatchArticleRatingArgs {
  id: string;
  rate: number;
  feedback?: string;
}

const patchRatingApi = rtkApi.injectEndpoints({
  endpoints: (build) => ({
    patchArticleRating: build.mutation<void, PatchArticleRatingArgs>({
      query: (body) => {
        const { id, ...rest } = body;
        return {
          url: `/article-ratings/${id}`,
          method: 'PATCH',
          body: rest,
        };
      },
      invalidatesTags: ['GetArticleRating'],
    }),
  }),
});

export const usePatchArticleRating =
  patchRatingApi.usePatchArticleRatingMutation;
