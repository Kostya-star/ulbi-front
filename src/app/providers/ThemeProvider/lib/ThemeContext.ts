import { createContext } from 'react';

export enum Theme {
  LIGHT = 'app_light_theme',
  DARK = 'app_dark_theme',
  DUSK_SERENITY = 'app_dusk_serenity_theme'
}

interface ThemeContextProps {
  theme?: Theme;
  setTheme?: (theme: Theme) => void
}

export const LOCAL_STORAGE_THEME_KEY: string = 'theme';

export const ThemeContext = createContext<ThemeContextProps>({});
