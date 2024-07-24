import { FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';

interface LangSwitcherProps {
  className?: string;
  isShort?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className, isShort }) => {
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
      {isShort ? t('language_short') : t('language')}
    </Button>
  );
};
