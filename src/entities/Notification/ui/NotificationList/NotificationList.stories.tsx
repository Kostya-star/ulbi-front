import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import StorybookAvatar from '@/shared/assets/tests/storybook/storybook-avatar.jpg';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import { NotificationList } from './NotificationList';
import { NotificationItem } from '../../model/types/notification';

export default {
  title: 'entities/notification/NotificationList',
  component: NotificationList,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof NotificationList>;

const Template: ComponentStory<typeof NotificationList> = (args) => <NotificationList {...args} />;

const notification: NotificationItem = {
  id: '1',
  title: 'Notification title',
  description: 'Notification description',
  user: {
    id: '1',
    role: ['ADMIN'],
    username: 'admin',
    avatar: StorybookAvatar,
  },
  userId: '1',
};

export const withPooling = Template.bind({});
withPooling.args = {};
withPooling.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];
withPooling.parameters = {
  mockData: [
    {
      url: `${__API_URL__}/notifications?_expand=user`,
      method: 'GET',
      status: 200,
      response: [
        { ...notification, id: '1' },
        { ...notification, id: '2' },
        { ...notification, id: '3' },
        { ...notification, id: '4', href: 'https://www.google.com/' },
      ],
      delay: 1000,
    },
  ],
};
