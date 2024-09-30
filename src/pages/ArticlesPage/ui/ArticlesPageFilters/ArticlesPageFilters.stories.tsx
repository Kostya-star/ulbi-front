import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { Theme } from '@/app/providers/ThemeProvider';
import { ArticleSortByOptions, ArticlesView, ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { ThemeDecorator } from '@/shared/config/storybook/ThemeDecorator/ThemeDecorator';
import { SortOrder } from '@/shared/types/SortOrder';
import { ArticlesPageSchema } from '../../model/types/ArticlesPageSchema';

import { ArticlesPageFilters } from './ArticlesPageFilters';

export default {
  title: 'pages/Article/ArticlesPageFilters',
  component: ArticlesPageFilters,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPageFilters>;

const Template: ComponentStory<typeof ArticlesPageFilters> = (args) => <ArticlesPageFilters {...args} />;

const initialState: ArticlesPageSchema = {
  error: null,
  isLoading: false,
  entities: {},
  ids: [],
  page: 1,
  limit: 9,
  hasMore: true,

  view: ArticlesView.SMALL,
  order: SortOrder.ASC,
  sortBy: ArticleSortByOptions.VIEWS,
  search: '',
  type: ArticleType.ALL,
};

export const Normal = Template.bind({});
Normal.args = {};
Normal.decorators = [
  (StoryComp: Story) => StoreDecorator(StoryComp, {
    articlesPage: initialState,
  }),
  // (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];
