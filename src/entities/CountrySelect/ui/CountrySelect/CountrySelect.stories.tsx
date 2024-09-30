import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from '@/app/providers/ThemeProvider';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Country } from '../../model/types/country';
import { CountrySelect } from './CountrySelect';

export default {
  title: 'entities/CountrySelect',
  component: CountrySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CountrySelect>;

const Template: ComponentStory<typeof CountrySelect> = (args) => <CountrySelect {...args} />;

export const light = Template.bind({});
light.args = {
  value: Country.Moldova,
};

export const lightReadonly = Template.bind({});
lightReadonly.args = {
  value: Country.Moldova,
  readonly: true,
};

export const dark = Template.bind({});
dark.args = {
  value: Country.Moldova,
};
dark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
