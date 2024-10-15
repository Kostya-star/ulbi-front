import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Popover } from './Popover';
import { Button } from '../Button/Button';

export default {
  title: 'shared/Popover',
  component: Popover,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {},
  decorators: [(Story) => <div style={{ padding: '200px' }}>{Story()}</div>],
} as ComponentMeta<typeof Popover>;

const Template: ComponentStory<typeof Popover> = (args) => (
  <Popover {...args} />
);

const popoverContent = (
  <div className="popoverContentWrpper">
    <div>opt1</div>
    <div>opt2</div>
    <div>opt3</div>
  </div>
);

const trigger = <Button className="triggerButton">trigger</Button>;

export const topLeft = Template.bind({});
topLeft.args = {
  children: popoverContent,
  direction: 'top left',
  trigger,
};

export const topRight = Template.bind({});
topRight.args = {
  children: popoverContent,
  direction: 'top right',
  trigger,
};

export const bottomLeft = Template.bind({});
bottomLeft.args = {
  children: popoverContent,
  direction: 'bottom left',
  trigger,
};

export const bottomRight = Template.bind({});
bottomRight.args = {
  children: popoverContent,
  direction: 'bottom right',
  trigger,
};
