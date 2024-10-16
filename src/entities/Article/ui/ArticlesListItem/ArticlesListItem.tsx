import { HTMLAttributeAnchorTarget, memo, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { getRouteArticleDetails } from '@/app/providers/router';
import ArticleViewsIcon from '@/shared/assets/icons/eye.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppImage } from '@/shared/ui/AppImage/AppImage';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { Button } from '@/shared/ui/Button';
import { Card } from '@/shared/ui/Card';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { Text } from '@/shared/ui/Text';

import cls from './ArticlesListItem.module.scss';
import { ArticleBlockType, ArticlesView } from '../../model/const/article';
import { Article, ArticleBlockText } from '../../model/type/article';
import { ArticleBlockTextComp } from '../ArticleBlockTextComp/ArticleBlockTextComp';

interface ArticlesListItemProps {
  className?: string;
  article: Article;
  view: ArticlesView;
  target?: HTMLAttributeAnchorTarget;
}

export const ArticlesListItem = memo(
  ({ className, article, view, target }: ArticlesListItemProps) => {
    const { t } = useTranslation('articles');

    const textBlock = useMemo(() => {
      return article.blocks.find((b) => b.type === ArticleBlockType.TEXT);
    }, [article]) as ArticleBlockText;

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
        <div
          data-testid="ArticlesListItem"
          className={classNames('', {}, [className, cls[view]])}
        >
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

            <AppImage
              className={cls.img}
              src={article.img}
              alt={article.title}
              fallbackLoading={<Skeleton width="100%" height="250px" />}
            />

            {textBlock && (
              <ArticleBlockTextComp
                block={textBlock}
                className={cls.textBlock}
              />
            )}

            <div className={cls.footer}>
              <AppLink target={target} to={getRouteArticleDetails(article.id)}>
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
        data-testid="ArticlesListItem"
        target={target}
        to={getRouteArticleDetails(article.id)}
        className={classNames('', {}, [className, cls[view]])}
      >
        <Card>
          <div className={cls.imgWrapper}>
            <AppImage
              className={cls.img}
              src={article.img}
              alt={article.title}
              fallbackLoading={<Skeleton width="200px" height="200px" />}
            />

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
  },
);
