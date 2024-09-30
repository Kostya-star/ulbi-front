import { CommentList } from '@/entities/Comment';
import { AddCommentForm } from '@/features/addCommentForm';
import { memo, useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Text } from '@/shared/ui/Text/Text';
import { useConditionalEffect } from '@/shared/hooks/useConditionalEffect/useConditionalEffect';
import { useTranslation } from 'react-i18next';
import { VStack } from '@/shared/ui/Stack';
import { fetchCommentsByArticleId } from '../../model/services/fetchCommentsByArticleId/fetchCommentsByArticleId';
import { getArticleComments } from '../../model/slices/articleDetailsCommentsSlice';
import { getArticleCommentsIsLoading } from '../../model/selectors/comments';
import { addCommentForArticle } from '../../model/services/addCommentForArticle/addCommentForArticle';

interface ArticleDetailsCommentsProps {
  className?: string;
  articleId: string;
}

const _HARDCORDED_STORYBOOK_MOCK_ARTICLE_ID = '1';

export const ArticleDetailsComments = memo(({ className, articleId }: ArticleDetailsCommentsProps) => {
  const { t } = useTranslation('articles');
  const dispatch = useAppDispatch();

  const comments = useSelector(getArticleComments.selectAll);
  const isCommentsLoading = useSelector(getArticleCommentsIsLoading);

  // useConditionalEffect(() => {
  //   dispatch(fetchCommentsByArticleId(articleId));
  // }, [articleId, dispatch]);
  useEffect(() => {
    const id = __PROJECT__ === 'storybook' ? _HARDCORDED_STORYBOOK_MOCK_ARTICLE_ID : articleId;
    dispatch(fetchCommentsByArticleId(id));
  }, [articleId, dispatch]);

  const sendComment = useCallback(async (newComment: string) => {
    if (articleId) {
      dispatch(addCommentForArticle({ newComment, articleId }));
    }
  }, [articleId, dispatch]);

  return (
    <VStack
      gap='16'
      allWidth
      alignItems='normal'
      className={classNames('', {}, [className])}
    >
      <Text title={t('comments_title')} />
      <AddCommentForm sendComment={sendComment} />
      <CommentList
        isLoading={isCommentsLoading}
        comments={comments}
      />
    </VStack>
  );
});
