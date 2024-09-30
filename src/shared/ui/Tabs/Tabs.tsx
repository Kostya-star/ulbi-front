import { memo, ReactNode, useCallback } from 'react';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Card, CardTheme } from '../Card/Card';
import cls from './Tabs.module.scss';

interface TabItem {
  value: string;
  text: ReactNode;
}

interface TabsProps {
  className?: string;
  tabs: TabItem[];
  value: string;
  onTabClick: (tabVal: string) => void
}

export const Tabs = memo(({
  className, tabs, value, onTabClick,
}: TabsProps) => {
  const onClick = useCallback((newTab: TabItem) => () => {
    onTabClick(newTab.value);
  }, [onTabClick]);

  return (
    <div className={classNames(cls.Tabs, {}, [className])}>
      {
        tabs.map((tab) => (
          <Card
            theme={tab.value === value ? CardTheme.OUTLINE : CardTheme.NORMAL}
            key={tab.value}
            disabled={tab.value === value}
            onClick={onClick(tab)}
          >
            {tab.text}
          </Card>
        ))
      }
    </div>
  );
});
