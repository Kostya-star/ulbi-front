import React from 'react';

import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';

import AdminPanelPage from './AdminPanelPage';

export default {
  title: 'pages/AdminPanelPage',
  component: AdminPanelPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof AdminPanelPage>;

const Template: ComponentStory<typeof AdminPanelPage> = (args) => <AdminPanelPage />;

export const Normal = Template.bind({});
Normal.args = {

};
Normal.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];
