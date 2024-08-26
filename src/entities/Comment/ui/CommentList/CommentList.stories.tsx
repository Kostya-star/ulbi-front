import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import StorybookAvatar from 'shared/assets/tests/storybook/storybook-avatar.jpg';
import { CommentList } from './CommentList';

export default {
  title: 'entities/Comment/CommentList',
  component: CommentList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof CommentList>;

const Template: ComponentStory<typeof CommentList> = (args) => <CommentList {...args} />;

const comments = [
  {
    id: '1',
    text: 'some comment text 1',
    user: { id: '1', username: 'Constantin', avatar: StorybookAvatar },
  },
  {
    id: '2',
    text: 'some comment text 2',
    user: { id: '2', username: 'Arina', avatar: StorybookAvatar },
  },
];

export const light = Template.bind({});
light.args = { comments };

export const lightIsLoading = Template.bind({});
lightIsLoading.args = {
  comments,
  isLoading: true,
};

export const dark = Template.bind({});
dark.args = { comments };
dark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];

export const duskSerenity = Template.bind({});
duskSerenity.args = { comments };
duskSerenity.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DUSK_SERENITY),
];