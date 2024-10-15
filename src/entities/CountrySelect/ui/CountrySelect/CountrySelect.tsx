import { memo, useCallback } from 'react';

import { useTranslation } from 'react-i18next';

import { classNames } from '@/shared/lib/classNames/classNames';
import { ListBox } from '@/shared/ui/ListBox';

import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  readonly?: boolean;
  onChange?: (country: Country) => void;
}

const options = [
  { value: Country.Holland, content: Country.Holland },
  { value: Country.Moldova, content: Country.Moldova },
  { value: Country.Poland, content: Country.Poland },
  { value: Country.Russia, content: Country.Russia },
  { value: Country.USA, content: Country.USA },
];

export const CountrySelect = memo(
  ({ className, value, readonly, onChange }: CountrySelectProps) => {
    const { t } = useTranslation();

    const onChangeCountry = useCallback(
      (country: string) => {
        onChange?.(country as Country);
      },
      [onChange],
    );

    return (
      <ListBox
        className={classNames('', {}, [className])}
        label={t('your_country')}
        items={options}
        value={value}
        readonly={readonly}
        onChange={onChangeCountry}
      />
      // <Select
      //   className={classNames('', {}, [className])}
      //   label={t('your_country')}
      //   options={options}
      //   value={value}
      //   readonly={readonly}
      //   onChange={onChangeCountry}
      // />
    );
  },
);
