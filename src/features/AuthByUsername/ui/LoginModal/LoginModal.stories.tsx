import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginModal } from './LoginModal';

export default {
  title: 'features/LoginModal',
  component: LoginModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

export const light = Template.bind({});
light.args = {
  isOpen: true,
};
light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const dark = Template.bind({});
dark.args = {
  isOpen: true,
};
dark.decorators = [
  (StoryComp: Story) => StoreDecorator(StoryComp),
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];

export const lightWithError = Template.bind({});
lightWithError.args = {
  isOpen: true,
};
lightWithError.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp, {
  login: {
    error: 'error',
  },
})];

export const lightWithLoading = Template.bind({});
lightWithLoading.args = {
  isOpen: true,
};
lightWithLoading.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp, {
  login: {
    isLoading: true,
  },
})];
