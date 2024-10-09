import { memo, useCallback, useMemo } from 'react';

import { useTranslation } from 'react-i18next';

import { ArticleType } from '@/entities/Article';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Tabs } from '@/shared/ui/Tabs';

import cls from './ArticleTypeTabs.module.scss';

interface ArticleTypeTabsProps {
  className?: string;
  value: ArticleType;
  tabClick: (newTab: ArticleType) => void
}

export const ArticleTypeTabs = memo(({ className, value, tabClick }: ArticleTypeTabsProps) => {
  const { t } = useTranslation('articles');

  const tabs = useMemo(() => [
    {
      value: ArticleType.ALL,
      text: t('type_ALL'),
    },
    {
      value: ArticleType.IT,
      text: t('type_IT'),
    },
    {
      value: ArticleType.ECONOMICS,
      text: t('type_ECONOMICS'),
    },
    {
      value: ArticleType.SCIENCE,
      text: t('type_SCIENCE'),
    },
  ], [t]);

  const onTabClick = useCallback((newType: string) => {
    tabClick(newType as ArticleType);
  }, [tabClick]);

  return (
    <div className={classNames(cls.ArticleTypeTabs, {}, [className])}>
      <Tabs
        tabs={tabs}
        value={value}
        onTabClick={onTabClick}
      />
    </div>
  );
});
