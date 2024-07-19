import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from './ErrorPage.module.scss';

interface ErrorPageProps {
  className?: string;
}

export const ErrorPage: FC<ErrorPageProps> = ({ className }) => {
  const { t } = useTranslation();

  const refreshPage = () => window.location.reload();
  return (
    <div className={classNames(cls.ErrorPage, {}, [className])}>
      {t('unexpected_error')}

      <Button onClick={refreshPage}>{t('refresh_page')}</Button>
    </div>
  );
};
