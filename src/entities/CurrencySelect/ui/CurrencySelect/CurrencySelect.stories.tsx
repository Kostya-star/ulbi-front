import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { Currency } from '../../model/types/currency';
import { CurrencySelect } from './CurrencySelect';

export default {
  title: 'entities/CurrencySelect',
  component: CurrencySelect,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof CurrencySelect>;

const Template: ComponentStory<typeof CurrencySelect> = (args) => <CurrencySelect {...args} />;

export const light = Template.bind({});
light.args = {
  value: Currency.EUR,
};

export const lightReadonly = Template.bind({});
lightReadonly.args = {
  value: Currency.EUR,
  readonly: true,
};

export const dark = Template.bind({});
dark.args = {
  value: Currency.EUR,
};
dark.decorators = [(StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK)];
