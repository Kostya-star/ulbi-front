import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { RootReducersType } from 'app/providers/StoreProvider/config/StateSchema';
import { profileReducer } from 'entities/Profile';
import { loginReducer } from 'features/AuthByUsername';
import { articleDetailsReducer } from 'entities/Article/model/slice/articleDetailsSlice';

const defaultAsyncReducers: DeepPartial<RootReducersType> = {
  login: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
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
