import { memo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticlesList } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './ArticleRecommendationsList.module.scss';
import { useArticleRecommendationsList } from '../../model/api/recommendationsListApi';

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
