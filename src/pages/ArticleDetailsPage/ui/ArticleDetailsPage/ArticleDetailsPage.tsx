import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useReduxReducerManager, ReducersList } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { articleDetailsCommentsReducer, getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const reducers: ReducersList = {
  articleDetailsComments: articleDetailsCommentsReducer,
};

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  useReduxReducerManager(reducers, true);

  const { id: articleId } = useParams();
  const { t } = useTranslation('articles');

  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const isCommentsLoading = useSelector(getArticleCommentsIsLoading);

  useConditionalEffect(() => {
    if (articleId) {
      dispatch(fetchCommentsByArticleId(articleId));
    }
  }, [articleId, dispatch]);

  if (!articleId) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('not_found_article')}
      </div>
    );
  }

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      {/* <ArticleDetails id={articleId} /> */}

      <Text title={t('comments_title')} className={cls.commentsTitle} />
      <CommentList
        isLoading={isCommentsLoading}
        comments={comments}
      />
    </div>
  );
});

export default ArticleDetailsPage;
