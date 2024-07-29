import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';

export default function AboutPage() {
  const { t } = useTranslation('about');

  return (
    <div>
      <Counter />
      {t('about_page')}
    </div>
  );
}
