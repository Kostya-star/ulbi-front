import { memo, useCallback, useState } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Button } from '@/shared/ui/Button';
import { Input } from '@/shared/ui/Input';
import { HStack } from '@/shared/ui/Stack';

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
    <HStack
      data-testid='AddCommentForm'
      justifyContent='between'
      alignItems='center'
      className={classNames(cls.AddCommentForm, {}, [className])}
    >
      <Input
        data-testid='AddCommentForm.Input'
        placeholder={t('write_comment')}
        value={newComment}
        onChange={writeComment}
      />
      <Button
        data-testid='AddCommentForm.Button'
        disabled={!newComment.trim()}
        onClick={onSendComment}
      >
        {t('add_comment')}
      </Button>
    </HStack>
  );
});

export default AddCommentForm;
