import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Select } from './Select';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
  title: 'shared/Select',
  component: Select,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const light = Template.bind({});
light.args = {
  options: [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
  ],
};

export const lightReadonly = Template.bind({});
lightReadonly.args = {
  options: [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
  ],
  readonly: true,
};

export const lightWithLabel = Template.bind({});
lightWithLabel.args = {
  options: [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
  ],
  label: 'Select label',
};

export const dark = Template.bind({});
dark.args = {
  options: [
    { value: '1', text: '1' },
    { value: '2', text: '2' },
    { value: '3', text: '3' },
  ],
};
dark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
