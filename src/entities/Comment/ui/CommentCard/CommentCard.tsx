import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Avatar } from 'shared/ui/Avatar/Avatar';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text } from 'shared/ui/Text/Text';
import { Comment } from '../../model/type/comment';
import cls from './CommentCard.module.scss';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
}

export const CommentCard = memo(({ className, comment }: CommentCardProps) => {
  return (
    <div className={classNames(cls.CommentCard, {}, [className])}>
      <div className={cls.header}>
        {comment?.user.avatar ? <Avatar src={comment?.user.avatar} size={30} /> : null}
        <Text text={comment?.user.username} />
      </div>

      <Text text={comment?.text} />
    </div>
  );
});
