import { memo } from 'react';

import { useParams } from 'react-router-dom';

import { ArticleDetails } from '@/entities/Article';
import { Counter } from '@/entities/Counter';
import { ArticleRating } from '@/features/ArticleRating';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import {
  useReduxReducerManager,
  ReducersList,
} from '@/shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from '@/shared/lib/classNames/classNames';
import { getFeatureFlag } from '@/shared/lib/features';
import { Page } from '@/widgets/Page';

import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';
import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  useReduxReducerManager(reducers, true);

  const { id: articleId } = useParams();

  const isArticleRatingEnabled = getFeatureFlag('isArticleRatingEnabled');
  const isCounterEnabled = getFeatureFlag('isCounterEnabled');

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetailsHeader />
      <ArticleDetails articleId={articleId!} />
      <ArticleDetailsComments
        articleId={articleId!}
        className={cls.detailsComments}
      />
      {isCounterEnabled && <Counter />}
      {isArticleRatingEnabled && <ArticleRating articleId={articleId!} />}
      <ArticleRecommendationsList className={cls.recommendationsList} />
    </Page>
  );
});

export default ArticleDetailsPage;
