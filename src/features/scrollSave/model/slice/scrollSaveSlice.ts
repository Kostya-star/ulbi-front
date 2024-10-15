import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { ScrollSaveSchema } from '../types/ScrollSaveSchema';

const initialState: ScrollSaveSchema = {
  scroll: {},
};

export const scrollSaveSlice = createSlice({
  name: 'scrollSave',
  initialState,
  reducers: {
    setScroll: (
      state,
      { payload }: PayloadAction<{ path: string; position: number }>,
    ) => {
      state.scroll[payload.path] = payload.position;
    },
  },
  // extraReducers: () => {},
});

export const { setScroll } = scrollSaveSlice.actions;

export const scrollSaveReducer = scrollSaveSlice.reducer;
