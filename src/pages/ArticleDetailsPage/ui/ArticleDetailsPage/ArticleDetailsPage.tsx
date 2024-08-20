import { ArticleDetails } from 'entities/Article';
import { CommentList } from 'entities/Comment';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import cls from './ArticleDetailsPage.module.scss';

interface ArticleDetailsPageProps {
  className?: string;
}

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  const { id } = useParams();
  const { t } = useTranslation('articles');

  if (!id) {
    return (
      <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
        {t('not_found_article')}
      </div>
    );
  }

  return (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={classNames(cls.ArticleDetailsPage, {}, [className])}>
      {/* <ArticleDetails id={id} /> */}

      <Text title={t('comments_title')} className={cls.commentsTitle} />
      <CommentList
        isLoading
        comments={[
          {
            id: '1',
            text: 'some comment text',
            user: {
              id: '1',
              username: 'Costya',
              // eslint-disable-next-line max-len
              avatar: 'https://flomaster.top/o/uploads/posts/2024-02/1708339350_flomaster-top-p-multyashnii-kachok-pinterest-risunok-3.jpg',
            },
          },
          {
            id: '2',
            text: 'some comment text',
            user: {
              id: '2',
              username: 'Bogdan',
              // eslint-disable-next-line max-len
              avatar: 'https://flomaster.top/o/uploads/posts/2024-02/1708339350_flomaster-top-p-multyashnii-kachok-pinterest-risunok-3.jpg',
            },
          },
        ]}
      />
    </div>
  );
});

export default ArticleDetailsPage;
