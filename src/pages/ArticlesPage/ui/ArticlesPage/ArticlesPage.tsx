import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ArticlesPage.module.scss';

interface ArticlesPageProps {
  className?: string;
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
  return (
    // eslint-disable-next-line i18next/no-literal-string
    <div className={classNames(cls.ArticlesPage, {}, [className])}>
      ArticlesPage
    </div>
  );
});

export default ArticlesPage;
