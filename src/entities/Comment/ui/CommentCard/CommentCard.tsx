import { memo } from 'react';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink } from 'shared/ui/AppLink/AppLink';
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
      <AppLink to={`${RoutePath.profile}${comment?.user.id}`} className={cls.header}>
        {comment?.user.avatar ? <Avatar src={comment?.user.avatar} size={30} /> : null}
        <Text text={comment?.user.username} />
      </AppLink>

      <Text text={comment?.text} />
    </div>
  );
});