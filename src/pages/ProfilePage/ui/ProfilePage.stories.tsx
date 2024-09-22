import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { Country } from 'entities/CountrySelect';
import { Currency } from 'entities/CurrencySelect';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import AvatarImg from 'shared/assets/tests/storybook/storybook-avatar.jpg';
import { Profile } from 'entities/Profile';
import ProfilePage from './ProfilePage';

export default {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof ProfilePage>;

const Template: ComponentStory<typeof ProfilePage> = () => <ProfilePage />;

const profileData: Profile = {
  id: '1',
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
Light.args = {};
Light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp, {
  profile: {
    data: profileData,
  },
})];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
  (StoryComp: Story) => StoreDecorator(StoryComp, {
    profile: {
      data: profileData,
    },
  }),
];
