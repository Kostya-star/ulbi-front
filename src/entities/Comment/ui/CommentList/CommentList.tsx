import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Skeleton } from '@/shared/ui/Skeleton/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text/Text';
import { Comment } from '../../model/type/comment';
import { CommentCard } from '../CommentCard/CommentCard';
import cls from './CommentList.module.scss';

interface CommentListProps {
  className?: string;
  comments?: Comment[]
  isLoading?: boolean;
}

export const CommentList = memo(({ className, comments, isLoading }: CommentListProps) => {
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <VStack gap='16' className={classNames('', {}, [className])}>
        <VStack allWidth gap='8'>
          <HStack
            alignItems='center'
            gap='8'
          >
            <Skeleton width={30} height={30} borderRadius='50%' />
            <Skeleton width={100} height={20} />
          </HStack>
          <Skeleton />
        </VStack>
        <VStack allWidth gap='8'>
          <HStack
            alignItems='center'
            gap='8'
          >
            <Skeleton width={30} height={30} borderRadius='50%' />
            <Skeleton width={100} height={20} />
          </HStack>
          <Skeleton />
        </VStack>
        <VStack allWidth gap='8'>
          <HStack
            alignItems='center'
            gap='8'
          >
            <Skeleton width={30} height={30} borderRadius='50%' />
            <Skeleton width={100} height={20} />
          </HStack>
          <Skeleton />
        </VStack>
      </VStack>
    );
  }

  return (
    <VStack
      gap='16'
      className={classNames('', {}, [className])}
    >
      {
        comments?.length
          ? comments.map((c) => (
            <CommentCard key={c.id} comment={c} />
          ))
          : <Text text={t('no_comments')} />
      }
    </VStack>
  );
});
