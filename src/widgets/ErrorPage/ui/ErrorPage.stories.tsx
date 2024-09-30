import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { ErrorPage } from './ErrorPage';

export default {
  title: 'widgets/ErrorPage',
  component: ErrorPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ErrorPage>;

const Template: ComponentStory<typeof ErrorPage> = (args) => <ErrorPage {...args} />;

export const ErrorPageLight = Template.bind({});
ErrorPageLight.args = {};

export const ErrorPageDark = Template.bind({});
ErrorPageDark.args = {};
ErrorPageDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
