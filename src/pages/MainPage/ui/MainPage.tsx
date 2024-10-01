import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Counter } from '@/entities/Counter';
import { ListBox, ListBoxItem } from '@/shared/ui/ListBox/ListBox';
import { Page } from '@/widgets/Page';
import { StarRating } from '@/shared/ui/StarRating/StarRating';
import { Rating } from '@/entities/Rating/ui/Rating/Rating';

export default function MainPage() {
  const { t } = useTranslation('main');

  const cancel = useCallback((...args) => {
    console.log('INSIDE CANCEL', ...args);
  }, []);

  const submit = useCallback((...args) => {
    console.log('INSIDE SUBMIT', ...args);
  }, []);

  return (
    <Page>
      <Counter />
      {t('main_page')}

      <Rating
        title='Rating'
        modalTitle='Write feedback'
        withFeedbackText
        cancel={cancel}
        submit={submit}
      />
    </Page>
  );
}
