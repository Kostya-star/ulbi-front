import { memo, useCallback } from 'react';

import CopyIcon from '@/shared/assets/icons/copy.svg';
import { classNames } from '@/shared/lib/classNames/classNames';

import cls from './Code.module.scss';
import { Button, ButtonTheme } from '../Button/Button';

interface CodeProps {
  className?: string;
  textCode: string;
}

export const Code = memo(({ className, textCode }: CodeProps) => {
  const copyToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(textCode);
  }, [textCode]);

  return (
    <pre className={classNames(cls.Code, {}, [className])}>
      <Button
        className={cls.copyBtn}
        theme={ButtonTheme.CLEAR}
        onClick={copyToClipboard}
      >
        <CopyIcon className={cls.copyIcon} />
      </Button>
      <code>
        {textCode}
      </code>
    </pre>
  );
});
