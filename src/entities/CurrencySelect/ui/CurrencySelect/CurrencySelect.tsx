import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Currency } from '../../model/types/currency';

interface CurrencySelectProps {
  className?: string;
  value?: Currency;
  readonly?: boolean;
  onChange?: (curr: Currency) => void;
}

const options = [
  { value: Currency.EUR, text: Currency.EUR },
  { value: Currency.MD, text: Currency.MD },
  { value: Currency.RUB, text: Currency.RUB },
  { value: Currency.USD, text: Currency.USD },
];

export const CurrencySelect = memo(({
  className,
  value,
  readonly,
  onChange,
}: CurrencySelectProps) => {
  const { t } = useTranslation();

  const onChangeCurrency = useCallback((curr: string) => {
    onChange?.(curr as Currency);
  }, [onChange]);

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('your_currency')}
      options={options}
      value={value}
      readonly={readonly}
      onChange={onChangeCurrency}
    />
  );
});
