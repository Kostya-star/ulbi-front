import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/CountrySelect';
import { Currency } from 'entities/CurrencySelect';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { ProfileCard } from './ProfileCard';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

export const Light = Template.bind({});
Light.args = {
  data: {
    first: 'Constantin',
    lastname: "Danilov",
    age: 24,
    city: "Bender",
    country: Country.Moldova,
    currency: Currency.MD,
    username: 'admin',
    avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6UAaJWm_4TBcA2qqrSHUpqE_ElwIkTbkx9Q&s',
  },
};
Light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
  (StoryComp: Story) => StoreDecorator(StoryComp),
];
