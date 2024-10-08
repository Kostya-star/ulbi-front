import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Card } from './Card';
import { Text } from '../Text/Text';

export default {
  title: 'shared/Card',
  component: Card,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Card>;

const Template: ComponentStory<typeof Card> = (args) => <Card {...args} />;

export const light = Template.bind({});
light.args = {
  children: <Text title='card title' text='card text' />,
};

export const dark = Template.bind({});
dark.args = {
  children: <Text title='card title' text='card text' />,
};
dark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const duskSerenity = Template.bind({});
duskSerenity.args = {
  children: <Text title='card title' text='card text' />,
};
duskSerenity.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DUSK_SERENITY)];
