/* eslint-disable front-fresh/layers-imports */
import { Story } from '@storybook/react';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { RootReducersType } from '@/app/providers/StoreProvider/config/StateSchema';
import { articleDetailsReducer } from '@/entities/Article';
import { loginReducer } from '@/features/AuthByUsername';
import { profileReducer } from '@/features/EditableProfileCard';
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage';
import { articlesPageReducer } from '@/pages/ArticlesPage';

const defaultAsyncReducers: DeepPartial<RootReducersType> = {
  login: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  articleDetailsPage: articleDetailsPageReducer,
  articlesPage: articlesPageReducer,
};

export const StoreDecorator = (
  StoryComp: Story,
  initialState?: DeepPartial<StateSchema>,
  asyncReducers?: DeepPartial<RootReducersType>,
) => (
  <StoreProvider
    initialState={initialState as StateSchema}
    asyncReducers={{ ...defaultAsyncReducers as RootReducersType, ...asyncReducers as RootReducersType }}
  >
    <StoryComp />
  </StoreProvider>
);
