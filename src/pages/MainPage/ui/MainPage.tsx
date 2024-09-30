import { Counter } from '@/entities/Counter';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ListBox, ListBoxItem } from '@/shared/ui/ListBox/ListBox';
import { Page } from '@/widgets/Page';

const options: ListBoxItem[] = [
  { content: 'Durward Reynolds', value: false },
  { content: 'Kenton Towne', value: false },
  { content: 'Therese Wunsch', value: false },
  { content: 'Benedict Kessler', value: true },
  { content: 'Katelyn Rohan', value: false },
];

export default function MainPage() {
  const { t } = useTranslation('main');

  const [listBoxVal, setListBoxVal] = useState(options[1].content);

  return (
    <Page>
      <Counter />
      {t('main_page')}

      <ListBox
        items={options}
        value={listBoxVal}
        onChange={setListBoxVal}
      />
    </Page>
  );
}
