import { createSelector } from '@reduxjs/toolkit';
import { StateSchema } from 'app/providers/StoreProvider';

export const getScrollState = (state: StateSchema) => state.scrollSave.scroll;

export const getScrollPositionByPath = createSelector(
  getScrollState,
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] ?? 0,
);
