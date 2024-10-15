import { createSlice } from '@reduxjs/toolkit';

const initialState = {};

export const articleRecommendationsListSlice = createSlice({
  name: 'articleRecommendationsList',
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

export const { someAction } = articleRecommendationsListSlice.actions;

export const { reducer: articleRecommendationsListReducer } =
  articleRecommendationsListSlice;
