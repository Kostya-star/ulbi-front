import {
  HTMLAttributeAnchorTarget, memo, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Icon } from '@/shared/ui/Icon';
import { Text } from '@/shared/ui/Text';
import ArticleViewsIcon from '@/shared/assets/icons/eye.svg';
import { Card } from '@/shared/ui/Card';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { RoutePath } from '@/app/providers/router/model/config/routeConfig';
import { AppLink } from '@/shared/ui/AppLink';
import { Article, ArticleBlockText } from '../../model/type/article';
import cls from './ArticlesListItem.module.scss';
import { ArticleBlockTextComp } from '../ArticleBlockTextComp/ArticleBlockTextComp';
import { ArticleBlockType, ArticlesView } from '../../model/const/article';

interface ArticlesListItemProps {
  className?: string;
  article: Article;
  view: ArticlesView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticlesListItem = memo(({
  className, article, view, target,
}: ArticlesListItemProps) => {
  const { t } = useTranslation('articles');

  const textBlock = useMemo(() => {
    return article.blocks.find((b) => b.type === ArticleBlockType.TEXT);
  }, [article.blocks]) as ArticleBlockText;

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
            <AppLink
              target={target}
              to={RoutePath.article_details + article.id}
            >
              <Button>{t('read_more')}</Button>
            </AppLink>
            {viewsSection}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <AppLink
      target={target}
      to={RoutePath.article_details + article.id}
      className={classNames('', {}, [className, cls[view]])}
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
    </AppLink>
  );
});
