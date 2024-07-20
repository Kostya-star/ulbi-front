import { ComponentStory, ComponentMeta } from '@storybook/react';

// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Theme, ThemeProvider } from 'app/providers/ThemeProvider';
import { StyleDecorator } from 'shared/config/storybook/StyleDecorator/StyleDecorator';
import { Button, ButtonTheme } from './Button';
// import "app/styles/index.scss";

export default {
  title: 'shared/Button',
  component: Button,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StyleDecorator],
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: 'Text',
};

export const Clear = Template.bind({});
Clear.args = {
  children: 'Text',
  theme: ButtonTheme.CLEAR,
};

export const OutlinedLight = Template.bind({});
OutlinedLight.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
};

OutlinedLight.decorators = [(story) => StyleDecorator(story, Theme.LIGHT)];

export const OutlinedDark = Template.bind({});
OutlinedDark.args = {
  children: 'Text',
  theme: ButtonTheme.OUTLINE,
};

OutlinedDark.decorators = [(story) => StyleDecorator(story, Theme.DARK)];

// export const Outline = Template.bind({});
// Outline.args = {
//   children: 'Text',
//   theme: ButtonTheme.OUTLINE,
// };

// export const OutlineDark = Template.bind({});
// OutlineDark.args = {
//   children: 'Text',
//   theme: ButtonTheme.OUTLINE,
// };
// OutlineDark.decorators = [ThemeDecorator(Theme.DARK)];
