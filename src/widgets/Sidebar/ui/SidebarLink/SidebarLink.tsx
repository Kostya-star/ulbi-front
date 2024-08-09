import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import { SidebarLinkItem } from 'widgets/Sidebar/model/types/SidebarLink';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './SidebarLink.module.scss';

interface SidebarLinkProps {
  item: SidebarLinkItem;
  isCollapsed?: boolean;
}

export const SidebarLink = memo(({ item, isCollapsed }: SidebarLinkProps) => {
  const { t } = useTranslation();
  return (
    <AppLink
      className={classNames(cls.link, { [cls.collapsed]: isCollapsed })}
      to={item.path}
      theme={AppLinkTheme.SECONDARY}
    >
      <item.Icon className={cls.icon} />

      <span className={cls.link_text}>
        {t(item.text)}
      </span>
    </AppLink>
  );
});