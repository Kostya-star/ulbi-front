import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StarRating } from './StarRating';

export default {
  title: 'shared/StarRating',
  component: StarRating,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof StarRating>;

const Template: ComponentStory<typeof StarRating> = (args) => <StarRating {...args} />;

export const rated = Template.bind({});
rated.args = {
  selectedStars: 5,
};

export const notRated = Template.bind({});
notRated.args = {
  selectedStars: 0,
};
