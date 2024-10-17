import { useContext } from 'react';

import { Theme, ThemeContext } from './ThemeContext';

interface UseThemeResult {
  theme: Theme;
  toggleTheme: (saveTheme: (theme: Theme) => void) => void;
}

export function useTheme(): UseThemeResult {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = (saveTheme: (theme: Theme) => void) => {
    let newTheme: Theme;

    switch (theme) {
      case Theme.DARK:
        newTheme = Theme.LIGHT;
        break;

      case Theme.LIGHT:
        newTheme = Theme.DUSK_SERENITY;
        break;

      case Theme.DUSK_SERENITY:
        newTheme = Theme.DARK;
        break;

      default:
        newTheme = Theme.LIGHT;
        break;
    }
    setTheme?.(newTheme);
    saveTheme(newTheme);
  };

  return {
    theme: theme || Theme.LIGHT,
    toggleTheme,
  };
}
