import { memo } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card } from '@/shared/ui/Card';
import { Skeleton } from '@/shared/ui/Skeleton';
import { ArticlesView } from '../../model/const/article';
import cls from './ArticlesListItem.module.scss';

interface ArticlesListItemSkeletonProps {
  view: ArticlesView
}

export const ArticlesListItemSkeleton = memo(({ view }: ArticlesListItemSkeletonProps) => {
  const viewsSection = (
    <div className={cls.views}>
      <Skeleton height={16} width={25} />
      <Skeleton height={16} width={10} />
    </div>
  );

  if (view === ArticlesView.BIG) {
    return (
      <div className={classNames('', {}, [cls[view]])}>
        <Card>
          <div className={cls.header}>
            <div className={cls.userData}>
              <Skeleton width={30} height={30} borderRadius='50%' />
              <Skeleton width={60} height={16} />
            </div>
            <Skeleton width={60} height={16} />
          </div>

          <Skeleton width={150} height={16} />
          <Skeleton width={50} height={16} />

          <Skeleton height={200} className={cls.img} />

          <div className={cls.footer}>
            <Skeleton width={100} height={25} />
            {viewsSection}
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={classNames('', {}, [cls[view]])}>
      <Card>
        <div className={cls.imgWrapper}>
          <Skeleton height={200} width={200} />
        </div>
        <div>
          <div className={cls.header}>
            <Skeleton height={15} width={130} />
            {viewsSection}
          </div>

          <Skeleton height={15} width={130} />
        </div>
      </Card>
    </div>
  );
});
