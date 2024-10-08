import { ComponentStory, ComponentMeta } from '@storybook/react';
import withMock from 'storybook-addon-mock';

import { Rating } from './Rating';

export default {
  title: 'entities/Rating',
  component: Rating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  decorators: [withMock],
} as ComponentMeta<typeof Rating>;

const Template: ComponentStory<typeof Rating> = (args) => <Rating {...args} />;

// const notification: IRating = {
//   id: '1',
//   title: 'Notification title',
//   description: 'Notification description',
//   user: {
//     id: '1',
//     role: ['ADMIN'],
//     username: 'admin',
//     avatar: StorybookAvatar,
//   },
//   userId: '1',
// };

export const rated = Template.bind({});
rated.args = {
  // modalTitle: 'modalTitle',
  rate: 2,
  title: 'Thanks for the rate:)',
};

export const notRated = Template.bind({});
notRated.args = {
  // modalTitle: 'modalTitle',
  rate: 0,
  title: 'Rate us please',
};

export const withModal = Template.bind({});
withModal.args = {
  modalTitle: 'Give us some feedback:)',
  title: 'Rate us please',
  withFeedbackText: true,
  rate: 0,
};
