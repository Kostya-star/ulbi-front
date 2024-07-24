import { MakeErrorTestBtn } from 'app/providers/ErrorBoundary';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './Navbar.module.scss';

interface NavbarProps {
  className?: string
}

export function Navbar({ className }: NavbarProps) {
  return (
    <div className={classNames(cls.Navbar, {}, [className])}>
      <MakeErrorTestBtn />
      <div className={cls.links}>
        {/* <AppLink to='/' theme={AppLinkTheme.SECONDARY}>{t('main')}</AppLink>
        <AppLink to='/about' theme={AppLinkTheme.SECONDARY}>{t('about')}</AppLink> */}
      </div>
    </div>
  );
}
