import { memo, useCallback, useMemo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Icon } from 'shared/ui/Icon/Icon';
import { Text } from 'shared/ui/Text/Text';
import ArticleViewsIcon from 'shared/assets/icons/eye.svg';
import { Card } from 'shared/ui/Card/Card';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
  Article, ArticleBlockText, ArticleBlockType, ArticlesView,
} from '../../model/type/article';
import cls from './ArticlesListItem.module.scss';
import { ArticleBlockTextComp } from '../ArticleBlockTextComp/ArticleBlockTextComp';

interface ArticlesListItemProps {
  className?: string;
  article: Article;
  view: ArticlesView;
}

export const ArticlesListItem = memo(({
  className, article, view,
}: ArticlesListItemProps) => {
  const { t } = useTranslation('articles');
  const navigate = useNavigate();

  const textBlock = useMemo(() => {
    return article.blocks.find((b) => b.type === ArticleBlockType.TEXT);
  }, [article.blocks]) as ArticleBlockText;

  const onBrowseArticleDetails = useCallback(() => {
    navigate(RoutePath.article_details + article.id);
  }, [article.id, navigate]);

  const viewsSection = useMemo(() => {
    return (
      <div className={cls.views}>
        <Text text={String(article.views)} />
        <Icon Svg={ArticleViewsIcon} />
      </div>
    );
  }, [article.views]);

  if (view === ArticlesView.BIG) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Card>
          <div className={cls.header}>
            <div className={cls.userData}>
              <Avatar size={30} src={article.user.avatar} />
              <Text text={article.user.username} />
            </div>
            <Text text={article.createdAt} />
          </div>

          <Text text={article.title} className={cls.title} />
          <Text text={article.type.join(', ')} className={cls.type} />

          <img src={article.img} alt={article.title} className={cls.img} />

          {
            textBlock && (
              <ArticleBlockTextComp block={textBlock} className={cls.textBlock} />
            )
          }

          <div className={cls.footer}>
            <Button onClick={onBrowseArticleDetails}>{t('read_more')}</Button>
            {viewsSection}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div
      className={classNames('', {}, [className, cls[view]])}
      onClick={onBrowseArticleDetails}
    >
      <Card>
        <div className={cls.imgWrapper}>
          <img src={article.img} alt={article.title} className={cls.img} />
          <Text text={article.createdAt} className={cls.date} />
        </div>
        <div>
          <div className={cls.header}>
            <Text text={article.type.join(', ')} className={cls.type} />
            {viewsSection}
          </div>

          <Text text={article.title} className={cls.title} />
        </div>
      </Card>
    </div>
  );
});
