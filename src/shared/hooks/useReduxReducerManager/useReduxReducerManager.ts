import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

export type ReducersList = {
  [reducerKey in StateSchemaKey]?: Reducer;
};

export const useReduxReducerManager = (
  reducers: ReducersList,
  removeAfterUnmount: boolean,
) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const entries = Object.entries(reducers);

    entries.forEach(([reducerKey, reducer]) => {
      store.reducerManager.add(reducerKey as StateSchemaKey, reducer);
      dispatch({ type: `@INIT ${reducerKey} async reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        entries.forEach(([reducerKey, _]) => {
          store.reducerManager.remove(reducerKey as StateSchemaKey);
          dispatch({ type: `@DESTROY ${reducerKey} async reducer` });
        });
      }
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
