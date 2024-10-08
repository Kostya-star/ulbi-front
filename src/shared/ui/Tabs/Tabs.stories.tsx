import { action } from '@storybook/addon-actions';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'shared/Tabs',
  component: Tabs,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  tabs: [
    {
      value: 'tab1',
      text: 'tab1',
    },
    {
      value: 'tab2',
      text: 'tab2',
    },
    {
      value: 'tab3',
      text: 'tab3',
    },
    {
      value: 'tab4',
      text: 'tab4',
    },
  ],
  value: 'tab4',
  onTabClick: action('onTabClick'),
};
// Normal.decorators = [
//   (StoryComp: Story) => StoreDecorator(StoryComp, {
//     articlesPage: initialState,
//   }),
//   // (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
// ];
