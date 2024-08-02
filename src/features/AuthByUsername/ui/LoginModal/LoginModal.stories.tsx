import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
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

const inputProps = {
  isOpen: true,
};

export const light = Template.bind({});
light.args = inputProps;
light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const dark = Template.bind({});
dark.args = inputProps;
dark.decorators = [
  (StoryComp: Story) => StoreDecorator(StoryComp),
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];

export const lightWithError = Template.bind({});
lightWithError.args = inputProps;
lightWithError.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp, {
  login: {
    error: 'Error',
  },
})];

export const lightWithLoading = Template.bind({});
lightWithLoading.args = inputProps;
lightWithLoading.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp, {
  login: {
    isLoading: true,
  },
})];
