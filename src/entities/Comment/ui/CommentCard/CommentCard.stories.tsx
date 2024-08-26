import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import StorybookAvatar from 'shared/assets/tests/storybook/storybook-avatar.jpg';
import { CommentCard } from './CommentCard';

export default {
  title: 'entities/Comment/CommentCard',
  component: CommentCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof CommentCard>;

const Template: ComponentStory<typeof CommentCard> = (args) => <CommentCard {...args} />;

const commentItem = {
  id: '1',
  text: 'some comment text 1',
  user: { id: '1', username: 'Constantin', avatar: StorybookAvatar },
};

export const light = Template.bind({});
light.args = {
  comment: commentItem,
};
// light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const dark = Template.bind({});
dark.args = {
  comment: commentItem,
};
dark.decorators = [
  // (StoryComp: Story) => StoreDecorator(StoryComp),
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];

export const duskSerenity = Template.bind({});
duskSerenity.args = {
  comment: commentItem,
};
duskSerenity.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DUSK_SERENITY),
];
