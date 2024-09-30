import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from '@/widgets/Page';

const ForbiddenPage = memo(() => {
  const { t } = useTranslation('forbidden');

  return (
    <Page>
      {t('access_forbidden')}
    </Page>
  );
});

export default ForbiddenPage;
