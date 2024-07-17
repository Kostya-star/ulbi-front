import { classNames } from 'shared/lib/classNames/classNames';
import { AppLink, AppLinkTheme } from 'shared/ui/AppLink/AppLink';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string;
}

export function Navbar({ className }: NavbarProps) {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <div className={cls.links}>
        <AppLink to='/' theme={AppLinkTheme.SECONDARY}>Main</AppLink>
        <AppLink to='/about' theme={AppLinkTheme.SECONDARY}>About</AppLink>
      </div>
    </div>
  );
}
