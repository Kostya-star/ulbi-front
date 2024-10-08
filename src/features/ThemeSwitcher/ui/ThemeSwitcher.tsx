import { memo, useMemo } from 'react';

import { Theme, useTheme } from '@/app/providers/ThemeProvider';
import DuskSerenityIcon from '@/shared/assets/icons/dusk_serenity.svg';
import DarkIcon from '@/shared/assets/icons/theme-dark.svg';
import LightIcon from '@/shared/assets/icons/theme-light.svg';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Button, ButtonTheme } from '@/shared/ui/Button';

interface ThemeSwitcherProps {
  className?: string;
}

export const ThemeSwitcher = memo(({ className }: ThemeSwitcherProps) => {
  const { theme, toggleTheme } = useTheme();

  const ThemeSwitcherIcon = useMemo(() => {
    if (theme === Theme.DARK) return DarkIcon;
    if (theme === Theme.LIGHT) return LightIcon;
    if (theme === Theme.DUSK_SERENITY) return DuskSerenityIcon;

    return LightIcon;
  }, [theme]);

  return (
    <Button
      theme={ButtonTheme.CLEAR}
      className={classNames('', {}, [className])}
      onClick={toggleTheme}
    >
      <ThemeSwitcherIcon />
    </Button>
  );
});
