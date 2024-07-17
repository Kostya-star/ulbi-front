import { FC, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Sidebar.module.scss';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { ThemeSwitcher } from 'widgets/ThemeSwitcher';

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
      <ThemeSwitcher />
      <LangSwitcher className={cls.lang}/>
    </div>
  </div>
);
}