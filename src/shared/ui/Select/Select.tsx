import { ChangeEvent, memo, useCallback, useMemo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  text: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: T;
  readonly?: boolean;
  onChange?: (opt: T) => void;
}

const Memo: <T>(c: T) => T = memo;

export const Select = Memo(
  <T extends string>({
    className,
    label,
    options,
    value,
    readonly,
    onChange,
  }: SelectProps<T>) => {
    const selectOptions = useMemo(
      () =>
        options?.map((opt) => (
          <option key={opt.value} value={opt.value} className={cls.option}>
            {opt.text}
          </option>
        )),
      [options],
    );

    const onChangeHandler = useCallback(
      (e: ChangeEvent<HTMLSelectElement>) => {
        onChange?.(e.target.value as T);
      },
      [onChange],
    );

    return (
      <div className={classNames(cls.SelectWrapper, {}, [className])}>
        {label && <span>{`${label}>`}</span>}

        <select
          value={value}
          className={cls.select}
          disabled={readonly}
          onChange={onChangeHandler}
        >
          {selectOptions}
        </select>
      </div>
    );
  },
);
