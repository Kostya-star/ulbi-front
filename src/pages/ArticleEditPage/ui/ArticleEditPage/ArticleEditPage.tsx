import { memo } from 'react';

import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { classNames } from '@/shared/lib/classNames/classNames';
import { Page } from '@/widgets/Page';

import cls from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo(({ className }: ArticleEditPageProps) => {
  const { t } = useTranslation('articles');
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  return (
    <Page className={classNames(cls.ArticleEditPage, {}, [className])}>
      {isEditMode ? t('edit_article') : t('create_article')}
    </Page>
  );
});

export default ArticleEditPage;
