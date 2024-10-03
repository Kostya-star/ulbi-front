import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/Counter';
import { ListBox, ListBoxItem } from '@/shared/ui/ListBox/ListBox';
import { Page } from '@/widgets/Page';
import { StarRating } from '@/shared/ui/StarRating/StarRating';

export default function MainPage() {
  const { t } = useTranslation('main');

  return (
    <Page>
      <Counter />
      {t('main_page')}
    </Page>
  );
}
