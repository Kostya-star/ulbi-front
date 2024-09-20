import { createSlice } from '@reduxjs/toolkit';
import { fetchProfileData } from '../services/fetchProfileData/fetchProfileData';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/profile';

const initialState: ProfileSchema = {
  data: null,
  isLoading: true,
  error: null,
  readonly: true,
};

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProfileData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchProfileData.fulfilled, (state, action) => {
      console.log('DATA FETCHED. Loading is false');

      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(fetchProfileData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    builder.addCase(updateProfileData.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateProfileData.fulfilled, (state, action) => {
      state.isLoading = false;
      state.error = null;
      state.data = action.payload;
    });
    builder.addCase(updateProfileData.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

// export const {} = profileSlice.actions;

export const profileReducer = profileSlice.reducer;
