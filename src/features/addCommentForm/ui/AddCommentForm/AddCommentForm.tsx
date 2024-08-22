import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { sendComment } from '../../model/services/sendComment/sendComment';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  articleId?: string;
}

const AddCommentForm = memo(({ className, articleId }: AddCommentFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const [newComment, setNewComment] = useState('');

  const writeComment = useCallback((comm: string) => {
    setNewComment(comm);
  }, []);

  const onSendComment = useCallback(async () => {
    const resp = await dispatch(sendComment({ newComment, articleId }));
    if (resp) setNewComment('');
  }, [articleId, newComment, dispatch]);

  return (
    <div className={classNames(cls.AddCommentForm, {}, [className])}>
      <Input
        placeholder={t('write_comment')}
        value={newComment}
        onChange={writeComment}
      />
      <Button
        disabled={!newComment.trim()}
        onClick={onSendComment}
      >
        {t('add_comment')}
      </Button>
    </div>
  );
});

export default AddCommentForm;
