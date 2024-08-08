import { memo, useMemo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonSize, ButtonTheme } from 'shared/ui/Button/Button';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';
import { sidebarLinksList } from '../../model/sidebarLinksList';
import cls from './Sidebar.module.scss';
import { SidebarLink } from '../SidebarLink/SidebarLink';

interface SidebarProps {
  className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
  const [isCollapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prev) => !prev);
  };

  const linksList = useMemo(() => sidebarLinksList.map((item) => (
    <SidebarLink key={item.path} item={item} isCollapsed={isCollapsed} />
  )), [isCollapsed]);

  return (
    <div
      data-testid='sidebar'
      className={classNames(cls.Sidebar, { [cls.collapsed]: isCollapsed }, [className])}
    >
      <div className={cls.links}>
        { linksList }
      </div>

      <div className={cls.switchers}>
        <ThemeSwitcher />
        <LangSwitcher isShort={isCollapsed} className={cls.lang} />
      </div>
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
    </div>
  );
});
