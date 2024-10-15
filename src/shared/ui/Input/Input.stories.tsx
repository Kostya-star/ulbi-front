import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Input } from './Input';

export default {
  title: 'shared/Input',
  component: Input,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

const inputProps = {
  value: '12345',
  placeholder: 'Type Text',
  autofocus: true,
};

export const InputLight = Template.bind({});
InputLight.args = inputProps;

export const InputDark = Template.bind({});
InputDark.args = inputProps;
InputDark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];
