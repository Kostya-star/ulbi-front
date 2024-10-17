import { FC, ReactNode, useEffect, useMemo, useState } from 'react';

import { useJsonSettings } from '@/entities/User';

import { Theme, ThemeContext } from '../lib/ThemeContext';

interface ThemeProviderProps {
  initialTheme?: Theme;
  children: ReactNode;
}

// const defaultTheme =
//   (localStorage.getItem(LOCAL_STORAGE_THEME_KEY) as Theme) ||
//   Theme.DUSK_SERENITY;

const ThemeProvider: FC<ThemeProviderProps> = ({ children, initialTheme }) => {
  const { theme: defaultTheme = Theme.DUSK_SERENITY } = useJsonSettings();
  const [theme, setTheme] = useState<Theme>(initialTheme || defaultTheme);

  const [isThemeInited, setThemeInited] = useState(false);

  useEffect(() => {
    if (isThemeInited) return;

    setTheme(defaultTheme);
    setThemeInited(true);
  }, [defaultTheme, isThemeInited]);

  const defaultProps = useMemo(
    () => ({
      theme,
      setTheme,
    }),
    [theme],
  );

  return (
    <ThemeContext.Provider value={defaultProps}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
