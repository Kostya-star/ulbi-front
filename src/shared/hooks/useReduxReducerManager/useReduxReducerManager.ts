import { Reducer } from '@reduxjs/toolkit';
import { ReduxStoreWithManager, StateSchemaKey } from 'app/providers/StoreProvider';
import { useEffect } from 'react';
import { useDispatch, useStore } from 'react-redux';

type ReducersList = {
  [reducerKey in StateSchemaKey]?: Reducer;
};

type ReducersListEntry = [StateSchemaKey, Reducer]

export const useReduxReducerManager = (
  reducers: ReducersList,
  removeAfterUnmount: boolean,
) => {
  const store = useStore() as ReduxStoreWithManager;
  const dispatch = useDispatch();

  useEffect(() => {
    const entries = Object.entries(reducers);

    entries.forEach(([reducerKey, reducer]: ReducersListEntry) => {
      store.reducerManager.add(reducerKey, reducer);
      dispatch({ type: `@INIT ${reducerKey} async reducer` });
    });

    return () => {
      if (removeAfterUnmount) {
        entries.forEach(([reducerKey, _]: ReducersListEntry) => {
          store.reducerManager.remove(reducerKey);
          dispatch({ type: `@DESTROY ${reducerKey} async reducer` });
        });
      }
    };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
