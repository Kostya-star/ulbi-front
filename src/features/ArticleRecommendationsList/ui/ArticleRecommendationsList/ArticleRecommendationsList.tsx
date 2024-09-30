import { classNames } from '@/shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Text } from '@/shared/ui/Text/Text';
import { Article, ArticlesList } from '@/entities/Article';
import { VStack } from '@/shared/ui/Stack';
import { useArticleRecommendationsList } from '../../model/api/recommendationsListApi';
import cls from './ArticleRecommendationsList.module.scss';

interface ArticleRecommendationsListProps {
  className?: string;
}

export const ArticleRecommendationsList = memo(({ className }: ArticleRecommendationsListProps) => {
  const { t } = useTranslation('articles');

  const { isLoading, data: articles } = useArticleRecommendationsList(3);

  return (
    <VStack gap='8' className={classNames('', {}, [className])}>
      <Text
        title={t('recommendations')}
      />
      <ArticlesList
        target='_blank'
        articles={articles}
        isLoading={isLoading}
        className={cls.recommendations}
      />
    </VStack>
  );
});
