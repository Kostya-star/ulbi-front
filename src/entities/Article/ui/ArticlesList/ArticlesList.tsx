import {
  HTMLAttributeAnchorTarget, memo, useMemo,
} from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text, TextAlign } from 'shared/ui/Text/Text';
import { Article, ArticlesView } from '../../model/type/article';
import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
import { ArticlesListItemSkeleton } from '../ArticlesListItem/ArticlesListItemSkeleton';
import cls from './ArticlesList.module.scss';

interface ArticlesListProps {
  className?: string;
  articles?: Article[];
  isLoading?: boolean;
  view?: ArticlesView
  target?: HTMLAttributeAnchorTarget;
}

const getSkeletons = (view: ArticlesView) => {
  return new Array(view === ArticlesView.SMALL ? 9 : 3).fill(0).map((_, ind) => (
    <ArticlesListItemSkeleton view={view} key={ind} />
  ));
};

export const ArticlesList = memo(({
  className, articles, isLoading, view = ArticlesView.SMALL, target,
}: ArticlesListProps) => {
  const { t } = useTranslation('articles');

  const articlesList = useMemo(() => {
    return articles!.map((article) => (
      <ArticlesListItem
        key={article.id}
        target={target}
        article={article}
        view={view}
      />
    ));
  }, [articles, view, target]);

  if (!isLoading && !articles?.length) {
    return (
      <div className={classNames('', {}, [className, cls[view]])}>
        <Text
          align={TextAlign.CENTER}
          title={t('no_articles')}
        />
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [className, cls[view]])}>
      {articles?.length ? articlesList : null}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
