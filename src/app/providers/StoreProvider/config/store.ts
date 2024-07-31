import {
  AnyAction, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { StateSchema } from './StateSchema';

type RootReducersType = Reducer<StateSchema, AnyAction> | ReducersMapObject<StateSchema, AnyAction>;

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: RootReducersType = {
    counter: counterReducer,
    user: userReducer,
  };
  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
