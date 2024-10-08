import { addDecorator } from '@storybook/react';
import 'app/styles/index.scss';
import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { RouterDecorator } from 'shared/config/storybook/RouterDecorator/RouterDecorator';
import { SuspenseDecorator } from 'shared/config/storybook/SuspenseDecorator/SuspenseDecorator';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  themes: {
    default: 'dusk_serenity',
    list: [
      {name: 'light', class: ['app', Theme.LIGHT], color: '#ffffff'},
      {name: 'dark', class: ['app', Theme.DARK], color: '#000000'},
      {name: 'dusk_serenity', class: ['app', Theme.DUSK_SERENITY], color: 'gray'}
    ]
  }
};

// global decorator for all stories. by default, all stories would have the light theme
// addDecorator((StoryComp) => ThemeDecorator(StoryComp, Theme.LIGHT));

// use react router dom
addDecorator(RouterDecorator);
addDecorator(SuspenseDecorator);
