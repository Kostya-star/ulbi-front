import {
  ChangeEvent, memo, useCallback, useMemo,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Select.module.scss';

export interface SelectOption {
  value: string,
  text: string;
}

interface SelectProps {
  className?: string;
  label?: string;
  options?: SelectOption[];
  value?: string;
  onChange?: (opt: string) => void;
}

export const Select = memo(({
  className,
  label,
  options,
  value,
  onChange,
}: SelectProps) => {
  const selectOptions = useMemo(() => options?.map((opt) => (
    <option
      key={opt.value}
      value={opt.value}
      className={cls.option}
    >
      {opt.text}
    </option>
  )), [options]);

  const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  }, [onChange]);

  return (
    <div className={classNames(cls.SelectWrapper, {}, [className])}>
      {
        label && (
          <span>
            { `${label}>` }
          </span>
        )
      }

      <select
        value={value}
        className={cls.select}
        onChange={onChangeHandler}
      >
        {selectOptions}
      </select>
    </div>
  );
});
