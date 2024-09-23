import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/CountrySelect';
import { Currency } from 'entities/CurrencySelect';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import AvatarImg from 'shared/assets/tests/storybook/storybook-avatar.jpg';
import { ProfileCard } from './ProfileCard';
import { Profile } from '../../model/types/profile';

export default {
  title: 'entities/ProfileCard',
  component: ProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof ProfileCard>;

const Template: ComponentStory<typeof ProfileCard> = (args) => <ProfileCard {...args} />;

const profileData: Profile = {
  first: 'Constantin',
  lastname: "Danilov",
  age: 24,
  city: "Bender",
  country: Country.Moldova,
  currency: Currency.MD,
  username: 'admin',
  avatar: AvatarImg,
};

export const Light = Template.bind({});
Light.args = {
  data: profileData,
  isReadonly: true,
};
Light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const LightWithError = Template.bind({});
LightWithError.args = {
  error: '...',
};
LightWithError.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const LightLoading = Template.bind({});
LightLoading.args = {
  isLoading: true,
};
LightLoading.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const Dark = Template.bind({});
Dark.args = {
  data: profileData,
  isReadonly: true,
};
Dark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
  (StoryComp: Story) => StoreDecorator(StoryComp),
];
