import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className }) => {
  const { t, i18n } = useTranslation();

  const switchLanguage = () => {
    const currentLanguage = i18n.language;
    i18n.changeLanguage(currentLanguage === 'en' ? 'ru' : 'en');
  };
  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [className])}
      onClick={switchLanguage}
    >
      {t('language')}
    </Button>
  );
};
