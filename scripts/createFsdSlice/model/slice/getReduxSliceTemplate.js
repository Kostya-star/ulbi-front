const { firstCharToLowerCase } = require('../../helpers/firstCharToLowerCase');

function getReduxSliceTemplate(sliceName) {
  return `
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { ${sliceName}Schema } from '../types/${sliceName}Schema';

const initialState: ${sliceName}Schema = {};

export const ${firstCharToLowerCase(sliceName)}Slice = createSlice({
  name: '${firstCharToLowerCase(sliceName)}',
  initialState,
  reducers: {
    someAction: (state) => {},
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(, (state) => {
  //             state.error = undefined;
  //             state.isLoading = true;
  //         })
  //         .addCase(, (state) => {
  //             state.isLoading = false;
  //         })
  //         .addCase(, (state, action) => {
  //             state.isLoading = false;
  //             state.error = action.payload;
  //         });
  // },
});

export const { someAction } = ${firstCharToLowerCase(sliceName)}Slice.actions;

export const { reducer: ${firstCharToLowerCase(sliceName)}Reducer } = ${firstCharToLowerCase(sliceName)}Slice;
`;
}

module.exports = { getReduxSliceTemplate };
