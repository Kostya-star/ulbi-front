import { DeepPartial } from '@reduxjs/toolkit';
import { Story } from '@storybook/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';

export const StoreDecorator = (StoryComp: Story, initialState?: DeepPartial<StateSchema>) => (
  <StoreProvider initialState={initialState as StateSchema}>
    <StoryComp />
  </StoreProvider>
);
