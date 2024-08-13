import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Avatar } from './Avatar';
import AvatarImg from './storybook-avatar.jpg';

export default {
  title: 'shared/Avatar',
  component: Avatar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  args: {
    to: '/',
  },
} as ComponentMeta<typeof Avatar>;

const Template: ComponentStory<typeof Avatar> = (args) => <Avatar {...args} />;

export const size100 = Template.bind({});
size100.args = {
  src: AvatarImg,
  size: 100,
};

export const size150 = Template.bind({});
size150.args = {
  src: AvatarImg,
  size: 150,
};

export const size150Dark = Template.bind({});
size150Dark.args = {
  src: AvatarImg,
  size: 150,
};
size150Dark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
