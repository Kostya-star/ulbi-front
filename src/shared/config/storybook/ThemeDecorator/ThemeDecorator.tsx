import { Story } from '@storybook/react';
import { StoreProvider } from 'app/providers/StoreProvider';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (StoryComp: Story, theme: Theme = Theme.LIGHT) => (
  <StoreProvider>
    <ThemeProvider initialTheme={theme}>
      <div className={`app ${theme}`}>
        <StoryComp />
      </div>
    </ThemeProvider>
  </StoreProvider>
);
