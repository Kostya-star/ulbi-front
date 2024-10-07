import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Skeleton } from './Skeleton';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
  title: 'shared/Skeleton',
  component: Skeleton,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Skeleton>;

const Template: ComponentStory<typeof Skeleton> = (args) => <Skeleton {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  width: '100%',
  height: 200,
};

export const Circle = Template.bind({});
Circle.args = {
  borderRadius: '50%',
  width: 100,
  height: 100,
};

export const NormalDark = Template.bind({});
NormalDark.args = {
  width: '100%',
  height: 200,
};
NormalDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const CircleDark = Template.bind({});
CircleDark.args = {
  borderRadius: '50%',
  width: 100,
  height: 100,
};
CircleDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
