import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page';

const AdminPanelPage = memo(() => {
  const { t } = useTranslation('admin');

  return (
    <Page>
      {t('admin_panel')}
    </Page>
  );
});

export default AdminPanelPage;