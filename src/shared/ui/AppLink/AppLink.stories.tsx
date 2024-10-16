import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { AppLink, AppLinkTheme } from './AppLink';

export default {
  title: 'widgets/AppLink',
  component: AppLink,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof AppLink>;

const Template: ComponentStory<typeof AppLink> = (args) => (
  <AppLink {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'App Link Text',
  theme: AppLinkTheme.PRIMARY,
};

export const Secondary = Template.bind({});
Secondary.args = {
  children: 'App Link Text',
  theme: AppLinkTheme.SECONDARY,
};

export const PrimaryDark = Template.bind({});
PrimaryDark.args = {
  children: 'App Link Text',
  theme: AppLinkTheme.PRIMARY,
};
PrimaryDark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];

export const SecondaryDark = Template.bind({});
SecondaryDark.args = {
  children: 'App Link Text',
  theme: AppLinkTheme.SECONDARY,
};
SecondaryDark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];
