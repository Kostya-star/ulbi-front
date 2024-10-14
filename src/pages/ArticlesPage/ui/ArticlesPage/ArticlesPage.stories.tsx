// import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

// import { Theme } from 'app/providers/ThemeProvider';
// import { StoreDecorator } from 'shared/config/storybook/StoreDecorator/StoreDecorator';
// import { ThemeDecorator } from 'shared/config/storybook/ThemeDecorator/ThemeDecorator';
// import ArticlesPage from './ArticlesPage';

// export default {
//   title: 'pages/articles/ArticlesPage',
//   component: ArticlesPage,
//   argTypes: {
//     backgroundColor: { control: 'color' },
//   },
//   // decorators: [StoreDecorator],
// } as ComponentMeta<typeof ArticlesPage>;

// const Template: ComponentStory<typeof ArticlesPage> = () => <ArticlesPage />;

// export const Light = Template.bind({});
// Light.args = {};
// Light.decorators = [(StoryComp: Story) => StoreDecorator(StoryComp)];

// export const Dark = Template.bind({});
// Dark.args = {};
// Dark.decorators = [
//   (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
//   (StoryComp: Story) => StoreDecorator(StoryComp),
// ];

import { ComponentStory, ComponentMeta, Story } from '@storybook/react';

import { ArticleSortByOptions, ArticlesView, ArticleType } from '@/entities/Article';
import { StoreDecorator } from '@/shared/config/storybook/StoreDecorator/StoreDecorator';
import { SortOrder } from '@/shared/types/SortOrder';

import ArticlesPage from './ArticlesPage';
import { ArticlesPageSchema } from '../../model/types/ArticlesPageSchema';

export default {
  title: 'pages/Article/ArticlesPage',
  component: ArticlesPage,
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof ArticlesPage>;

const Template: ComponentStory<typeof ArticlesPage> = (args) => <ArticlesPage {...args} />;

const articlesPageInitialState: ArticlesPageSchema = {
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
  (StoryComp: Story) =>
    StoreDecorator(StoryComp, {
      articlesPage: articlesPageInitialState,
    }),
];

export const isLoading = Template.bind({});
isLoading.args = {};
isLoading.decorators = [
  (StoryComp: Story) => {
    const copyState: ArticlesPageSchema = JSON.parse(JSON.stringify(articlesPageInitialState));
    copyState.isLoading = true;

    return StoreDecorator(StoryComp, {
      articlesPage: copyState,
    });
  },
  // (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];

export const viewBig = Template.bind({});
viewBig.args = {};
viewBig.decorators = [
  (StoryComp: Story) => {
    const copyState: ArticlesPageSchema = JSON.parse(JSON.stringify(articlesPageInitialState));
    copyState.view = ArticlesView.BIG;
    copyState.isLoading = true;

    return StoreDecorator(StoryComp, {
      articlesPage: copyState,
    });
  },
  // (StoryComp: Story) => ThemeDecorator(StoryComp, Theme.DARK),
];
