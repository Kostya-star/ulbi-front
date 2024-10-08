import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import AddCommentForm from './AddCommentForm';

export default {
  title: 'features/AddCommentForm',
  component: AddCommentForm,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof AddCommentForm>;

const Template: ComponentStory<typeof AddCommentForm> = (args) => <AddCommentForm {...args} />;

export const light = Template.bind({});
light.args = {
  // sendComment: action('sendComment'),
};
light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const dark = Template.bind({});
dark.args = {};
dark.decorators = [
  (StoryComp: Story) => StoreDecorator(StoryComp),
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];
