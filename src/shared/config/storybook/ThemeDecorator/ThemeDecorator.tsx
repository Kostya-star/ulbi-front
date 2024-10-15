import { Story } from '@storybook/react';

import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider';

export const ThemeDecorator = (
  StoryComp: Story,
  theme: Theme = Theme.LIGHT,
) => (
  <ThemeProvider initialTheme={theme}>
    <div className={`app ${theme}`}>
      <StoryComp />
    </div>
  </ThemeProvider>
);
