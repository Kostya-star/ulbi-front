import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Select } from 'shared/ui/Select/Select';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  readonly?: boolean;
  onChange?: (country: Country) => void;
}

const options = [
  { value: Country.Holland, text: Country.Holland },
  { value: Country.Moldova, text: Country.Moldova },
  { value: Country.Poland, text: Country.Poland },
  { value: Country.Russia, text: Country.Russia },
  { value: Country.USA, text: Country.USA },
];

export const CountrySelect = memo(({
  className,
  value,
  readonly,
  onChange,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const onChangeCountry = useCallback((country: string) => {
    onChange?.(country as Country);
  }, [onChange]);

  return (
    <Select
      className={classNames('', {}, [className])}
      label={t('your_country')}
      options={options}
      value={value}
      readonly={readonly}
      onChange={onChangeCountry}
    />
  );
});
