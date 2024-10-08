import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';

import { Code } from './Code';

export default {
  title: 'shared/Code',
  component: Code,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Code>;

const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;

const textCode = 'export default {\n'
        + '    title: \'shared/Code\',\n'
        + '    component: Code,\n'
        + '    argTypes: {\n'
        + '        backgroundColor: { control: \'color\' },\n'
        + '    },\n'
        + '} as ComponentMeta<typeof Code>;\n'
        + '\n'
        + 'const Template: ComponentStory<typeof Code> = (args) => <Code {...args} />;\n'
        + '\n'
        + 'export const Normal = Template.bind({});';

export const Normal = Template.bind({});
Normal.args = { textCode };

export const Dark = Template.bind({});
Dark.args = { textCode };
Dark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];

export const daskSerenity = Template.bind({});
daskSerenity.args = { textCode };
daskSerenity.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DUSK_SERENITY)];
