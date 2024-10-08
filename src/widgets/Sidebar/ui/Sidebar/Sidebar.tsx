import { memo, useMemo, useState } from 'react';

import { useSelector } from 'react-redux';

import { getAuthUserData } from '@/entities/User';
import { LangSwitcher } from '@/features/LangSwitcher';
import { ThemeSwitcher } from '@/features/ThemeSwitcher';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from '@/shared/ui/Button';
import { HStack, VStack } from '@/shared/ui/Stack';

import cls from './Sidebar.module.scss';
import { getSidebarItems } from '../../model/selectors/getSidebarItems';
import { SidebarLink } from '../SidebarLink/SidebarLink';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const isAuth = useSelector(getAuthUserData);
  const sidebarLinksList = useSelector(getSidebarItems);

  const [isCollapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const linksList = useMemo(() => {
    return sidebarLinksList
      .filter((link) => {
        if (link.authOnly && !isAuth) return false;
        return true;
      }).map((item) => (
        <SidebarLink
          key={item.path}
          item={item}
          isCollapsed={isCollapsed}
        />
      ));
  }, [sidebarLinksList, isAuth, isCollapsed]);

  return (
    <section
      data-testid='sidebar'
      className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [className])}
    >
      <VStack
        gap='8'
        className={cls.links}
      >
        { linksList }
      </VStack>

      <HStack
        justifyContent='center'
        gap='8'
        alignItems='center'
        allWidth
        className={cls.switchers}
      >
        <ThemeSwitcher />
        <LangSwitcher isShort={isCollapsed} className={cls.lang} />
      </HStack>
      <Button
        data-testid='toggle-sidebar-width-btn'
        type='button'
        className={cls.collapseBtn}
        theme={ButtonTheme.BACKGROUND_INVERTED}
        square
        size={ButtonSize.L}
        onClick={toggleSidebar}
      >
        {isCollapsed ? '>' : '<'}
      </Button>
    </section>
  );
});
