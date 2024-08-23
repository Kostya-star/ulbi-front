import { memo, useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import cls from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  sendComment: (newComm: string) => void;
}

const AddCommentForm = memo(({ className, sendComment }: AddCommentFormProps) => {
  const { t } = useTranslation();

  const [newComment, setNewComment] = useState('');

  const writeComment = useCallback((comm: string) => {
    setNewComment(comm);
  }, []);

  const onSendComment = useCallback(() => {
    sendComment(newComment);
    setNewComment('');
  }, [newComment, sendComment]);

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
