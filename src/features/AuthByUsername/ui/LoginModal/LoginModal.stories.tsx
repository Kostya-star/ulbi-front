import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { LoginModal } from './LoginModal';

export default {
  title: 'features/LoginModal',
  component: LoginModal,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof LoginModal>;

const Template: ComponentStory<typeof LoginModal> = (args) => <LoginModal {...args} />;

const inputProps = {
  isOpen: true,
};

export const light = Template.bind({});
light.args = inputProps;

export const dark = Template.bind({});
dark.args = inputProps;
dark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
