import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ListBox, ListBoxItem } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
  },
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => <ListBox {...args} />;

const options: ListBoxItem[] = [
  { content: 'Durward Reynolds', value: false },
  { content: 'Kenton Towne', value: false },
  { content: 'Therese Wunsch', value: false },
  { content: 'Benedict Kessler', value: true },
  { content: 'Katelyn Rohan', value: false },
];

export const bottom = Template.bind({});
bottom.args = {
  items: options,
  value: options[1].content,
  onChange: action('onChange'),
};

export const top = Template.bind({});
top.args = {
  items: options,
  value: options[1].content,
  direction: 'top',
  onChange: action('onChange'),
};

export const readonly = Template.bind({});
readonly.args = {
  items: options,
  value: options[1].content,
  readonly: true,
  onChange: action('onChange'),
};

export const withLabel = Template.bind({});
withLabel.args = {
  items: options,
  value: options[1].content,
  label: 'list box label',
  onChange: action('onChange'),
};

export const withDefaultValue = Template.bind({});
withDefaultValue.args = {
  items: options,
  value: undefined,
  defaultValue: 'defaultVal',
  onChange: action('onChange'),
};
