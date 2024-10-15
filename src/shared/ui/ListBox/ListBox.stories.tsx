import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { ListBox, ListBoxItem } from './ListBox';

export default {
  title: 'shared/ListBox',
  component: ListBox,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  decorators: [(Story) => <div style={{ padding: '200px' }}>{Story()}</div>],
} as ComponentMeta<typeof ListBox>;

const Template: ComponentStory<typeof ListBox> = (args) => (
  <ListBox {...args} />
);

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

export const topLeft = Template.bind({});
topLeft.args = {
  items: options,
  defaultValue: 'dflt',
  direction: 'top left',
};

export const topRight = Template.bind({});
topRight.args = {
  items: options,
  defaultValue: 'dflt',
  direction: 'top right',
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
  items: options,
  defaultValue: 'dflt',
  direction: 'bottom left',
};

export const bottomRight = Template.bind({});
bottomRight.args = {
  items: options,
  defaultValue: 'dflt',
  direction: 'bottom right',
};
