import { Counter } from 'entities/Counter';
import { useTranslation } from 'react-i18next';
import { Page } from 'shared/ui/Page/Page';

export default function MainPage() {
  const { t } = useTranslation('main');

  return (
    <Page>
      <Counter />
      {t('main_page')}
    </Page>
  );
}
