import { FC, ReactNode } from 'react';

import { Provider } from 'react-redux';

import { RootReducersType, StateSchema } from '../config/StateSchema';
import { createReduxStore } from '../config/store';

interface StoreProviderProps {
  children?: ReactNode;
  initialState?: StateSchema;
  asyncReducers?: RootReducersType;
}

export const StoreProvider: FC<StoreProviderProps> = ({ children, initialState, asyncReducers }) => {
  const store = createReduxStore(initialState, asyncReducers);
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
};
