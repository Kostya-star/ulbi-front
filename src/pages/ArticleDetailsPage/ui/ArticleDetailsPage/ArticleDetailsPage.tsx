import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useReduxReducerManager, ReducersList } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { useConditionalEffect } from 'shared/hooks/useConditionalEffect/useConditionalEffect';
import { AddCommentForm } from 'features/addCommentForm';
import { Button } from 'shared/ui/Button/Button';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Page } from 'widgets/Page';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';
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

  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const comments = useSelector(getArticleComments.selectAll);
  const isCommentsLoading = useSelector(getArticleCommentsIsLoading);

  useConditionalEffect(() => {
    if (articleId) {
      dispatch(fetchCommentsByArticleId(articleId));
    }
  }, [articleId, dispatch]);

  const sendComment = useCallback(async (newComment: string) => {
    if (articleId) {
      dispatch(addCommentForArticle({ newComment, articleId }));
    }
  }, [articleId, dispatch]);

  const goBackToAllArticles = useCallback(() => {
    navigate(RoutePath.articles);
  }, [navigate]);

  if (!articleId) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('not_found_article')}
      </div>
    );
  }

  return (
    <Page className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      <Button onClick={goBackToAllArticles}>{t('back_to_articles')}</Button>
      <ArticleDetails id={articleId} />

      <Text title={t('comments_title')} className={cls.commentsTitle} />
      <AddCommentForm sendComment={sendComment} />
      <CommentList
        isLoading={isCommentsLoading}
        comments={comments}
        className={cls.commentsList}
      />
    </Page>
  );
});

export default ArticleDetailsPage;
