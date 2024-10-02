import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { classNames } from '@/shared/lib/classNames/classNames';
import cls from './ArticleRating.module.scss';
import { Rating } from '@/entities/Rating';
import { useGetArticleRating } from '../../model/api/getArticleRating';
import { getAuthUserData, User } from '@/entities/User';
import { usePostArticleRating } from '../../model/api/postArticleRating';
import { usePatchArticleRating } from '../../model/api/patchArticleRating';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';

export interface ArticleRatingProps {
  className?: string;
  articleId: string;
}

const ArticleRating = memo(({ className, articleId }: ArticleRatingProps) => {
  const { t } = useTranslation('articles');
  const authData = useSelector(getAuthUserData) as User;

  const { data, isFetching: isGetLoading } = useGetArticleRating({ userId: authData.id, articleId });
  const [postArticleRating, { isLoading: isPostLoading }] = usePostArticleRating();
  const [patchArticleRating, { isLoading: isPatchLoading }] = usePatchArticleRating();

  const oldRate = data?.[0]?.rate;
  const isRatingExist = !!oldRate;

  const handlePostArticleRating = useCallback((rate: number, feedback?: string) => {
    if (isRatingExist) {
      patchArticleRating({
        id: data![0].id,
        rate,
        feedback,
      });
    } else {
      postArticleRating({
        articleId,
        userId: authData.id,
        rate,
        feedback,
      });
    }
  }, [articleId, authData.id, data, isRatingExist, patchArticleRating, postArticleRating]);

  const cancel = useCallback((rate: number) => {
    handlePostArticleRating(rate);
  }, [handlePostArticleRating]);

  const submit = useCallback((rate: number, feedbackText?: string) => {
    handlePostArticleRating(rate, feedbackText);
  }, [handlePostArticleRating]);

  if (isGetLoading || isPostLoading || isPatchLoading) {
    return <Skeleton width='100%' height='110px' borderRadius='12px' />;
  }

  const ratingTitle = isRatingExist
    ? t('title_rate_exist')
    : t('title_rate_no_exist');

  return (
    <div className={classNames('', {}, [className])}>
      <Rating
        rate={oldRate}
        title={ratingTitle}
        modalTitle={t('rating_modal_title')}
        withFeedbackText
        cancel={cancel}
        submit={submit}
      />
    </div>
  );
});

export default ArticleRating;
