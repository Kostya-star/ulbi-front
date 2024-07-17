import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ThemeSwitcher } from 'shared/ui/ThemeSwitcher/ThemeSwitcher';
import cls from './Sidebar.module.scss';

interface SidebarProps {
  className?: string;
}

export const Sidebar: FC<SidebarProps> = ({ className }) => {
  const [isCollapsed, setCollapsed] = useState(false)

  const toggleSidebar = () => {
    setCollapsed(prev => !prev)
  }

  return (
  <div className={classNames(cls.Sidebar, {[cls.collapsed]: isCollapsed}, [className])}>
    <button onClick={toggleSidebar}>toggle Sidebar width</button>

    <div className={cls.switchers}>
      {/* LangSwitcher */}
      <ThemeSwitcher />
    </div>
  </div>
);
}