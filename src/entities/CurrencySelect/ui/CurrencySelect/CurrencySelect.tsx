import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/ListBox';

import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  readonly?: boolean;
  onChange?: (curr: Currency) => void;
}

// const options = [
//   { value: Currency.EUR, text: Currency.EUR },
//   { value: Currency.MD, text: Currency.MD },
//   { value: Currency.RUB, text: Currency.RUB },
//   { value: Currency.USD, text: Currency.USD },
// ];
const options = [
  { value: Currency.EUR, content: Currency.EUR },
  { value: Currency.MD, content: Currency.MD },
  { value: Currency.RUB, content: Currency.RUB },
  { value: Currency.USD, content: Currency.USD },
];

export const CurrencySelect = memo(
  ({ className, value, readonly, onChange }: CurrencySelectProps) => {
    const { t } = useTranslation();

    const onChangeCurrency = useCallback(
      (curr: string) => {
        onChange?.(curr as Currency);
      },
      [onChange],
    );

    return (
      <ListBox
        className={classNames('', {}, [className])}
        label={t('your_currency')}
        items={options}
        value={value}
        readonly={readonly}
        onChange={onChangeCurrency}
      />
      // <Select
      //   className={classNames('', {}, [className])}
      //   label={t('your_currency')}
      //   options={options}
      //   value={value}
      //   readonly={readonly}
      //   onChange={onChangeCurrency}
      // />
    );
  },
);
