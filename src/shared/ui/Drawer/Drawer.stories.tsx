import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { Drawer } from './Drawer';

export default {
  title: 'shared/Drawer',
  component: Drawer,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof Drawer>;

const Template: ComponentStory<typeof Drawer> = (args) => <Drawer {...args} />;

export const left = Template.bind({});
left.args = {
  children: <div>drawer content</div>,
  isOpen: true,
  side: 'left',
};

export const right = Template.bind({});
right.args = {
  children: <div>drawer content</div>,
  isOpen: true,
  side: 'right',
};

export const bottom = Template.bind({});
bottom.args = {
  children: <div>drawer content</div>,
  isOpen: true,
  side: 'bottom',
};
