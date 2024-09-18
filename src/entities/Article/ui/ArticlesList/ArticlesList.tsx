// WITH VIZUALIZATION

// import {
//   HTMLAttributeAnchorTarget, memo, useCallback,
// } from 'react';
// import { useTranslation } from 'react-i18next';
// import {
//   List, WindowScroller, ListRowProps, WindowScrollerChildProps,
// } from 'react-virtualized';
// import { PAGE_ID } from 'shared/const/pageId';
// import { classNames } from 'shared/lib/classNames/classNames';
// import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
// import { Text, TextAlign } from 'shared/ui/Text/Text';
// import { Article, ArticlesView } from '../../model/type/article';
// import { ArticlesListItem } from '../ArticlesListItem/ArticlesListItem';
// import { ArticlesListItemSkeleton } from '../ArticlesListItem/ArticlesListItemSkeleton';
// import cls from './ArticlesList.module.scss';

// interface ArticlesListProps {
//   className?: string;
//   articles: Article[];
//   isLoading?: boolean;
//   view?: ArticlesView
//   target?: HTMLAttributeAnchorTarget;
// }

// const getSkeletons = (view: ArticlesView) => {
//   return new Array(view === ArticlesView.SMALL ? 9 : 3).fill(0).map((_, ind) => (
//     <ArticlesListItemSkeleton view={view} key={ind} />
//   ));
// };

// export const ArticlesList = memo(({
//   className, articles, isLoading, view = ArticlesView.SMALL, target,
// }: ArticlesListProps) => {
//   const { t } = useTranslation('articles');

//   const isBigView = view === ArticlesView.BIG;

//   const articlesPerRow = isBigView ? 1 : 3;
//   const rowsCount = Math.ceil(articles.length / articlesPerRow);

//   const rowRenderer = useCallback(({
//     index, isScrolling, isVisible, key, style,
//   }: ListRowProps) => {
//     const items = [];
//     const fromIndex = index * articlesPerRow;
//     const toIndex = Math.min(fromIndex + articlesPerRow, articles.length);

//     for (let i = fromIndex; i < toIndex; i += 1) {
//       items.push(
//         <ArticlesListItem
//           article={articles[i]}
//           view={view}
//           target={target}
//           key={`str${i}`}
//           className={cls.card}
//         />,
//       );
//     }
//     return (
//       <div
//         key={key}
//         style={style}
//         className={cls.row}
//       >
//         {items}
//       </div>
//     );
//   }, [articles, articlesPerRow, target, view]);

//   const renderArticlesList = useCallback((args: WindowScrollerChildProps) => {
//     const {
//       height, width, isScrolling, scrollTop, onChildScroll,
//     } = args;

//     return articles.length
//       ? (
//         <List
//           height={height ?? 700}
//           width={width ? width - 80 : 700}
//           rowCount={rowsCount}
//           rowHeight={isBigView ? 700 : 330}
//           autoHeight
//           rowRenderer={rowRenderer}
//           onScroll={onChildScroll}
//           isScrolling={isScrolling}
//           scrollTop={scrollTop}
//         />
//       )
//       : null;
//   }, [articles.length, isBigView, rowRenderer, rowsCount]);

//   if (!isLoading && !articles.length) {
//     return (
//       <div className={classNames('', {}, [className, cls[view]])}>
//         <Text
//           align={TextAlign.CENTER}
//           title={t('no_articles')}
//         />
//       </div>
//     );
//   }

//   return (
//     <WindowScroller scrollElement={document.getElementById(PAGE_ID) as Element}>
//       {({
//         height, width, scrollTop, registerChild, onChildScroll,
//       }) => (
//         <div ref={registerChild} className={classNames('', {}, [className, cls[view]])}>
//           {renderArticlesList({
//             height, width, scrollTop, onChildScroll,
//           } as WindowScrollerChildProps)}
//           {isLoading && getSkeletons(view)}
//         </div>
//       )}
//     </WindowScroller>
//   );
// });

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

// WITHOUT VIZUALIZATION

export const ArticlesList = memo(({
  className, articles, isLoading, view = ArticlesView.SMALL, target,
}: ArticlesListProps) => {
  const { t } = useTranslation('articles');

  const articlesList = useMemo(() => {
    return articles?.length
      ? articles.map((article) => (
        <ArticlesListItem
          key={article.id}
          target={target}
          article={article}
          view={view}
        />
      ))
      : null;
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
      {articlesList}
      {isLoading && getSkeletons(view)}
    </div>
  );
});
