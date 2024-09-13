import {
  Fragment, ReactNode, useCallback, useMemo,
} from 'react';
import { Listbox as HListBox } from '@headlessui/react';
import { classNames } from 'shared/lib/classNames/classNames';
import { HStack } from '../Stack';
import { Button } from '../Button/Button';
import cls from './ListBox.module.scss';

export interface ListBoxItem {
    content: string;
    value: ReactNode;
    disabled?: boolean;
}

type DropdownDirection = 'top' | 'bottom';

interface ListBoxProps {
    items?: ListBoxItem[];
    className?: string;
    value?: string;
    defaultValue?: string;
    onChange?: (value: string) => void;
    readonly?: boolean;
    direction?: DropdownDirection;
    label?: string;
}

const mapDirectionClass: Record<DropdownDirection, string> = {
  bottom: cls.optionsBottom,
  top: cls.optionsTop,
};

export const ListBox = (props: ListBoxProps) => {
  const {
    className,
    items,
    value,
    defaultValue,
    onChange,
    readonly = false,
    direction = 'bottom',
    label,
  } = props;

  const optionsClasses = useMemo(() => [mapDirectionClass[direction]], [direction]);

  const onChangeValue = useCallback((newVal: string) => {
    onChange?.(newVal);
  }, [onChange]);

  const listItems = useMemo(() => items?.map((item) => (
    <HListBox.Option
      key={item.content}
      value={item.content}
      disabled={item.disabled}
      as={Fragment}
    >
      {({ active: isHovered, selected }) => (
        <li className={classNames(cls.item, getListItemMods(isHovered, selected, item.disabled))}>
          {item.content}
        </li>
      )}
    </HListBox.Option>
  )), [items]);

  return (
    <HStack gap="4">
      {label && <span>{label}</span>}
      <HListBox
        disabled={readonly}
        as="div"
        className={classNames(cls.ListBox, {}, [className])}
        value={value}
        onChange={onChangeValue}
      >
        <HListBox.Button disabled={readonly} className={cls.trigger}>
          <Button disabled={readonly}>
            {value ?? defaultValue}
          </Button>
        </HListBox.Button>
        <HListBox.Options className={classNames(cls.options, {}, optionsClasses)}>
          {listItems}
        </HListBox.Options>
      </HListBox>
    </HStack>
  );
};

function getListItemMods(isHovered: boolean, selected: boolean, disabled?: boolean) {
  return {
    [cls.isHovered]: isHovered,
    [cls.selected]: selected,
    [cls.disabled]: disabled,
  };
}
