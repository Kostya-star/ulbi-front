import { getArticleDetailsData } from 'entities/Article';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { getUserCanEditArticle } from '../../model/selectors/article';
import cls from './ArticleDetailsHeader.module.scss';

interface ArticleDetailsHeaderProps {
  className?: string;
}

export const ArticleDetailsHeader = memo(({ className }: ArticleDetailsHeaderProps) => {
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const canEdit = useSelector(getUserCanEditArticle);
  const article = useSelector(getArticleDetailsData);

  const navigateToAllArticles = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  const navigateToEditArticle = useCallback(() => {
    navigate(`${RoutePath.article_details}${article?.id}/edit`);
  }, [article?.id, navigate]);

  return (
    <div className={classNames(cls.ArticleDetailsHeader, {}, [className])}>
      <Button onClick={navigateToAllArticles}>{t('back_to_articles')}</Button>
      {canEdit && <Button onClick={navigateToEditArticle}>{t('edit_article')}</Button>}
    </div>
  );
});
