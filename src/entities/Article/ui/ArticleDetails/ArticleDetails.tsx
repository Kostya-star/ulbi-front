import { memo, useCallback, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import EyeIcon from '@/shared/assets/icons/eye.svg';
import ScheduleIcon from '@/shared/assets/icons/schedule.svg';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { useReduxReducerManager } from '@/shared/hooks/useReduxReducerManager/useReduxReducerManager';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/Avatar';
import { Icon } from '@/shared/ui/Icon';
import { Skeleton } from '@/shared/ui/Skeleton';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text, TextAlign, TextSize, TextTheme } from '@/shared/ui/Text';

import cls from './ArticleDetails.module.scss';
import { ArticleBlockType } from '../../model/const/article';
import {
  getArticleDetailsData,
  getArticleDetailsError,
  getArticleDetailsLoading,
} from '../../model/selectors/getArticleDetails/getArticleDetails';
import { fetchArticleById } from '../../model/services/fetchArticleById/fetchArticleById';
import { articleDetailsReducer } from '../../model/slice/articleDetailsSlice';
import { ArticleBlock } from '../../model/type/article';
import { ArticleBlockCodeComp } from '../ArticleBlockCodeComp/ArticleBlockCodeComp';
import { ArticleBlockImgComp } from '../ArticleBlockImgComp/ArticleBlockImgComp';
import { ArticleBlockTextComp } from '../ArticleBlockTextComp/ArticleBlockTextComp';

interface ArticleDetailsProps {
  className?: string;
  articleId: string;
}

const reducers = {
  articleDetails: articleDetailsReducer,
};

const _HARDCORDED_STORYBOOK_MOCK_ARTICLE_ID = '1';

export const ArticleDetails = memo(
  ({ articleId, className }: ArticleDetailsProps) => {
    useReduxReducerManager(reducers, true);
    const dispatch = useAppDispatch();
    const { t } = useTranslation('articles');

    const article = useSelector(getArticleDetailsData);
    const isLoading = useSelector(getArticleDetailsLoading);
    const error = useSelector(getArticleDetailsError);

    useEffect(() => {
      const id =
        __PROJECT__ === 'storybook'
          ? _HARDCORDED_STORYBOOK_MOCK_ARTICLE_ID
          : articleId;
      dispatch(fetchArticleById(id));
    }, [articleId, dispatch]);

    const renderArticleBlocks = useCallback((block: ArticleBlock) => {
      switch (block.type) {
        case ArticleBlockType.TEXT:
          return (
            <ArticleBlockTextComp
              key={block.id}
              block={block}
              className={cls.block}
            />
          );

        case ArticleBlockType.CODE:
          return (
            <ArticleBlockCodeComp
              key={block.id}
              block={block}
              className={cls.block}
            />
          );

        case ArticleBlockType.IMAGE:
          return (
            <ArticleBlockImgComp
              key={block.id}
              block={block}
              className={cls.block}
            />
          );

        default:
          return null;
      }
    }, []);

    let content;

    if (isLoading) {
      content = (
        <>
          <HStack justifyContent="center">
            <Skeleton width={200} height={200} borderRadius="50%" />
          </HStack>
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
        <>
          <HStack justifyContent="center">
            <Avatar size={200} src={article?.img} />
          </HStack>
          <VStack gap="8">
            <Text
              className={cls.title}
              title={article?.title}
              size={TextSize.L}
            />
            <Text text={article?.subtitle} />

            <VStack gap="8">
              <HStack alignItems="center" gap="8">
                <Icon Svg={EyeIcon} />
                <Text text={String(article?.views)} />
              </HStack>
              <HStack alignItems="center" gap="8">
                <Icon Svg={ScheduleIcon} />
                <Text text={article?.createdAt} />
              </HStack>
            </VStack>
          </VStack>

          {article?.blocks.map(renderArticleBlocks)}
        </>
      );
    }

    return (
      // eslint-disable-next-line i18next/no-literal-string
      <div
        data-testid="ArticleDetails"
        className={classNames(cls.ArticleDetails, {}, [className])}
      >
        {content}
      </div>
    );
  },
);
