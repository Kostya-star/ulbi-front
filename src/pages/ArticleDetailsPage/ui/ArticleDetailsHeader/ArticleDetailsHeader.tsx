import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getRouteArticleEdit, getRouteArticles } from '@/app/providers/router';
import { getArticleDetailsData } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { HStack } from '@/shared/ui/Stack';

import { getUserCanEditArticle } from '../../model/selectors/article';

interface ArticleDetailsHeaderProps {
  className?: string;
}

export const ArticleDetailsHeader = memo(({ className }: ArticleDetailsHeaderProps) => {
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const canEdit = useSelector(getUserCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const navigateToAllArticles = useCallback(() => {
    navigate(getRouteArticles());
  }, [navigate]);

  const navigateToEditArticle = useCallback(() => {
    if (article) {
      navigate(getRouteArticleEdit(article.id));
    }
  }, [article, navigate]);

  return (
    <HStack justifyContent="between" alignItems="center" className={classNames('', {}, [className])}>
      <Button onClick={navigateToAllArticles}>{t('back_to_articles')}</Button>
      {canEdit && <Button onClick={navigateToEditArticle}>{t('edit_article')}</Button>}
    </HStack>
  );
});
