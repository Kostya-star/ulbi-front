import {
  ChangeEvent,
  FC,
  InputHTMLAttributes,
  memo,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Input.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange'
>;

interface InputProps extends HTMLInputProps {
  value?: string | number;
  className?: string;
  type?: string;
  placeholder?: string;
  autofocus?: boolean;
  readonly?: boolean;
  onChange?: (value: string) => void;
}

const SYMBOL_WIDTH = 9; // the width of the CONSOLAS font in px

export const Input: FC<InputProps> = memo(
  ({
    value,
    type = 'text',
    className,
    placeholder,
    autofocus,
    readonly,
    onChange,
    ...restProps
  }: InputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isInputFocused, setInputFocused] = useState(false);
    const [underscoreElPosition, setUnderscoreElPosition] = useState(0);

    useEffect(() => {
      let timeout: NodeJS.Timeout;

      if (autofocus) {
        // use setTimeout for animations
        timeout = setTimeout(() => {
          setInputFocused(true);
          inputRef.current?.focus();
        }, 100);
      }

      return () => {
        if (timeout) clearTimeout(timeout);
      };
    }, [autofocus]);

    const onSetUnderscorePositionHandle = (newPosition: number) => {
      const inputEl = inputRef.current;

      // fix the problem with underscore getting out of the input area due to a lot of text
      if (inputEl && newPosition >= inputEl.offsetWidth) {
        setUnderscoreElPosition(inputEl.offsetWidth);
      } else {
        setUnderscoreElPosition(newPosition);
      }
    };

    const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
      const val = e.target.value;
      onChange?.(val);

      const newUnderscoreElPosition = val.length * SYMBOL_WIDTH;

      onSetUnderscorePositionHandle(newUnderscoreElPosition);
    };

    const onInputFocus = () => setInputFocused(true);
    const onInputBlur = () => setInputFocused(false);

    const onInputSelect = (e: SyntheticEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      const newUnderscoreElPosition =
        (target.selectionStart || 0) * SYMBOL_WIDTH;
      onSetUnderscorePositionHandle(newUnderscoreElPosition);
    };

    const isUnderscoreVisible = isInputFocused && !readonly;

    return (
      <div className={classNames(cls.InputWrapper, {}, [className])}>
        {placeholder?.trim() && (
          <span className={cls.placeholder}>{`${placeholder.trim()}>`}</span>
        )}
        <div className={cls.inputBlock}>
          <input
            ref={inputRef}
            value={value}
            type={type}
            className={cls.inputEl}
            readOnly={readonly}
            onChange={onInputChange}
            onBlur={onInputBlur}
            onFocus={onInputFocus}
            onSelect={onInputSelect}
            {...restProps}
          />
          {isUnderscoreVisible && (
            <span
              style={{ left: `${underscoreElPosition}px` }}
              className={cls.underscoreEl}
            />
          )}
        </div>
      </div>
    );
  },
);
