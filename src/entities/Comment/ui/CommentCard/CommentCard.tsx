import { memo } from 'react';

import { getRouteProfile } from '@/app/providers/router';
import { classNames } from '@/shared/lib/classNames/classNames';
import { AppLink } from '@/shared/ui/AppLink';
import { Avatar } from '@/shared/ui/Avatar';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from './CommentCard.module.scss';
import { Comment } from '../../model/type/comment';

interface CommentCardProps {
  className?: string;
  comment?: Comment;
}

export const CommentCard = memo(({ className, comment }: CommentCardProps) => {
  if (!comment) return null;

  return (
    <div data-testid='CommentCard.Content' className={classNames(cls.CommentCard, {}, [className])}>
      <AppLink to={getRouteProfile(comment.user.id)}>
        <HStack alignItems='center' gap='8' className={cls.header}>
          {comment.user.avatar ? <Avatar src={comment.user.avatar} size={30} /> : null}
          <Text text={comment.user.username} />
        </HStack>
      </AppLink>

      <Text text={comment.text} />
    </div>
  );
});
