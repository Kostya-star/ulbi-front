import { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './Code.module.scss';

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
