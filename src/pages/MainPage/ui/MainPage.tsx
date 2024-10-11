import { useTranslation } from 'react-i18next';

import { Counter } from '@/entities/Counter';
import { Page } from '@/widgets/Page';

export default function MainPage() {
  const { t } = useTranslation('main');

  return (
    <Page data-testid='MainPage'>
      <Counter />
      {t('main_page')}
    </Page>
  );
}
