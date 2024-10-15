import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Dropdown, DropdownItems } from './Dropdown';

export default {
  title: 'shared/Dropdown',
  component: Dropdown,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Dropdown>;

const Template: ComponentStory<typeof Dropdown> = (args) => (
  <Dropdown {...args} />
);

const items: DropdownItems[] = [
  {
    content: 'item 1 DISABLED',
    disabled: true,
  },
  {
    content: 'item 2',
  },
];

export const light = Template.bind({});
light.args = {
  trigger: 'more',
  items,
};
