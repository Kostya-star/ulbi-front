import { fetchArticleById } from 'entities/Article/model/services/fetchArticleById/fetchArticleById';
import { memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useReduxReducerManager } from 'shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from 'shared/lib/classNames/classNames';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { Text, TextAlign, TextTheme } from 'shared/ui/Text/Text';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsLoading,
} from '../../model/selectors/getArticleDetails/getArticleDetails';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import cls from './ArticleDetails.module.scss';

interface ArticleDetailsProps {
  className?: string;
  id: string
}

const reducers = {
  articleDetails: articleDetailsReducer,
};

export const ArticleDetails = memo(({ id, className }: ArticleDetailsProps) => {
  useReduxReducerManager(reducers, true);
  const dispatch = useAppDispatch();
  const { t } = useTranslation('articles');

  const article = useSelector(getArticleDetailsData);
  // const isLoading = useSelector(getArticleDetailsLoading);
  const isLoading = true;
  const error = useSelector(getArticleDetailsError);

  useEffect(() => {
    dispatch(fetchArticleById(id));
  }, [id, dispatch]);

  let content;

  if (isLoading) {
    content = (
      <>
        <Skeleton className={cls.avatar} width={200} height={200} borderRadius="50%" />
        <Skeleton className={cls.title} width={300} height={32} />
        <Skeleton className={cls.skeleton} width={600} height={24} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
        <Skeleton className={cls.skeleton} width="100%" height={200} />
      </>
    );
  } else if (error) {
    content = (
      <Text
        align={TextAlign.CENTER}
        title={t('article_loading_err')}
        theme={TextTheme.ERROR}
      />
    );
  } else {
    content = (
      'Article Details'
    );
  }

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={classNames(cls.ArticleDetails, {}, [className])}>
      {content}
    </div>
  );
});
