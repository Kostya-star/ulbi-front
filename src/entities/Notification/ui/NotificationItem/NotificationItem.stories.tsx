import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import StorybookAvatar from '@/shared/assets/tests/storybook/storybook-avatar.jpg';

import { NotificationItem } from './NotificationItem';
import type { NotificationItem as INotificationItem } from '../../model/types/notification';

export default {
  title: 'entities/notification/NotificationItem',
  component: NotificationItem,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof NotificationItem>;

const Template: ComponentStory<typeof NotificationItem> = (args) => <NotificationItem {...args} />;

const notification: INotificationItem = {
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

export const withNoHref = Template.bind({});
withNoHref.args = {
  notification,
};
// withNoHref.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const withHref = Template.bind({});
withHref.args = {
  notification: {
    ...notification,
    href: 'https://www.google.com/',
  },
};
// withNoHref.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];
