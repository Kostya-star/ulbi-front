import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';

export const ThemeDecorator = (StoryComp: Story, theme: Theme = Theme.LIGHT) => (
  <div className={`app ${theme}`}>
    <StoryComp />
  </div>
);
