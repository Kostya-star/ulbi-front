import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Text, TextSize, TextTheme } from './Text';
import { Theme } from '@/app/providers/ThemeProvider';

export default {
  title: 'shared/Text',
  component: Text,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Text>;

const Template: ComponentStory<typeof Text> = (args) => <Text {...args} />;

export const WithTitleAndText = Template.bind({});
WithTitleAndText.args = {
  title: 'Error Error Error Error Error',
  text: 'Error Error Error Error Error',
};

export const WithTitleAndTextDark = Template.bind({});
WithTitleAndTextDark.args = {
  title: 'Error Error Error Error Error',
  text: 'Error Error Error Error Error',
};

WithTitleAndTextDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  title: 'Error Error Error Error Error',
};

export const OnlyTitleDark = Template.bind({});
OnlyTitleDark.args = {
  title: 'Error Error Error Error Error',
};

OnlyTitleDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const OnlyText = Template.bind({});
OnlyText.args = {
  text: 'Error Error Error Error Error',
};

export const OnlyTextDark = Template.bind({});
OnlyTextDark.args = {
  text: 'Error Error Error Error Error',
};

OnlyTextDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const WithTitleAndTextError = Template.bind({});
WithTitleAndTextError.args = {
  title: 'Error Error Error Error Error',
  text: 'Error Error Error Error Error',
  theme: TextTheme.ERROR,
};

export const WithTitleAndTextErrorDark = Template.bind({});
WithTitleAndTextErrorDark.args = {
  title: 'Error Error Error Error Error',
  text: 'Error Error Error Error Error',
  theme: TextTheme.ERROR,
};

WithTitleAndTextErrorDark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const WithTitleAndTextSizeS = Template.bind({});
WithTitleAndTextSizeS.args = {
  title: 'Error Error Error Error Error',
  text: 'Error Error Error Error Error',
  size: TextSize.S,
};

export const WithTitleAndTextSizeM = Template.bind({});
WithTitleAndTextSizeM.args = {
  title: 'Error Error Error Error Error',
  text: 'Error Error Error Error Error',
  size: TextSize.M,
};

export const WithTitleAndTextSizeL = Template.bind({});
WithTitleAndTextSizeL.args = {
  title: 'Error Error Error Error Error',
  text: 'Error Error Error Error Error',
  size: TextSize.L,
};
