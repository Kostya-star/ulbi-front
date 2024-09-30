import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Navbar } from './Navbar';

export default {
  title: 'widgets/Navbar',
  component: Navbar,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Navbar>;

const Template: ComponentStory<typeof Navbar> = (args) => <Navbar {...args} />;

export const NavbarLight = Template.bind({});
NavbarLight.args = {};
NavbarLight.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const userSignedIn = Template.bind({});
userSignedIn.args = {};
userSignedIn.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp, {
  user: {
    authData: {},
  },
})];

export const NavbarDark = Template.bind({});
NavbarDark.args = {};
NavbarDark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
  (StoryComp: Story) => StoreDecorator(StoryComp),
];
