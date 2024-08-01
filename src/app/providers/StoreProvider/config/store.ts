import {
  AnyAction, configureStore, Reducer, ReducersMapObject,
} from '@reduxjs/toolkit';
import { counterReducer } from 'entities/Counter';
import { userReducer } from 'entities/User';
import { loginReducer } from 'features/AuthByUsername';
import { StateSchema } from './StateSchema';

type RootReducersType = Reducer<StateSchema, AnyAction> | ReducersMapObject<StateSchema, AnyAction>;

export function createReduxStore(initialState?: StateSchema) {
  const rootReducers: RootReducersType = {
    counter: counterReducer,
    user: userReducer,
    login: loginReducer,
  };
  return configureStore<StateSchema>({
    reducer: rootReducers,
    devTools: __IS_DEV__,
    preloadedState: initialState,
  });
}
