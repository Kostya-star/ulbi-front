import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { Theme } from 'app/providers/ThemeProvider';
import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
import ArticleDetailsPage from './ArticleDetailsPage';

export default {
  title: 'pages/ArticleDetailsPage',
  component: ArticleDetailsPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
  // decorators: [StoreDecorator],
} as ComponentMeta<typeof ArticleDetailsPage>;

const Template: ComponentStory<typeof ArticleDetailsPage> = () => <ArticleDetailsPage />;

export const Light = Template.bind({});
Light.args = {};
Light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

export const Dark = Template.bind({});
Dark.args = {};
Dark.decorators = [
  (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
  (StoryComp: Story) => StoreDecorator(StoryComp),
];
