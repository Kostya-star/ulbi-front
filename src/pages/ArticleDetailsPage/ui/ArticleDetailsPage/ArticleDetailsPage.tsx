import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { ArticleDetails } from '@/entities/Article';
import { useReduxReducerManager, ReducersList } from '@/shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';
import { ArticleRecommendationsList } from '@/features/ArticleRecommendationsList';
import cls from './ArticleDetailsPage.module.scss';
import { articleDetailsPageReducer } from '../../model/slices';
import { ArticleDetailsHeader } from '../ArticleDetailsHeader/ArticleDetailsHeader';
import { ArticleDetailsComments } from '../ArticleDetailsComments/ArticleDetailsComments';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsPage: articleDetailsPageReducer,
};

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  useReduxReducerManager(reducers, true);

  const { id: articleId } = useParams();
  const { t } = useTranslation('articles');

  // if (!articleId) {
  //   return (
  //     <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
  //       {t('not_found_article')}
  //     </div>
  //   );
  // }

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <ArticleDetailsHeader />
      <ArticleDetails articleId={articleId!} />
      <ArticleDetailsComments articleId={articleId!} className={cls.detailsComments} />
      <ArticleRecommendationsList className={cls.recommendationsList} />
    </Page>
  );
});

export default ArticleDetailsPage;
