import { useTranslation } from 'react-i18next';

import { Counter } from '@/entities/Counter';
import { Page } from '@/widgets/Page';

export default function AboutPage() {
  const { t } = useTranslation('about');

  return (
    <Page data-testid="AboutPage">
      <Counter />
      {t('about_page')}
    </Page>
  );
}
