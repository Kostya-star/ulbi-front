import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { EditableProfileCard } from './EditableProfileCard';

export default {
  title: 'features/EditableProfileCard',
  component: EditableProfileCard,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof EditableProfileCard>;

const Template: ComponentStory<typeof EditableProfileCard> = (args) => <EditableProfileCard {...args} />;

export const withHeader = Template.bind({});
withHeader.args = {
  withHeader: true,
};
withHeader.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const withoutHeader = Template.bind({});
withoutHeader.args = {
  // withHeader: false,
};
withoutHeader.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];
