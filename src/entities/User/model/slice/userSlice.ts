import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { setJsonSettings } from '../services/setJsonSettings';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  authData: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUserData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
    },
    initAuthUserData: (state) => {
      const userData = localStorage.getItem(USER_DATA_LOCAL_STORAGE);

      if (userData) {
        const user = JSON.parse(userData) as User;
        state.authData = user;
        setFeatureFlags(user.features);
      }
    },
    logout: (state) => {
      state.authData = null;
      localStorage.removeItem(USER_DATA_LOCAL_STORAGE);
    },
  },
  extraReducers: (builder) => {
    // builder.addCase(setJsonSettings.pending, (state) => {
    // state.isLoading = true;
    // state.error = null;
    // });
    builder.addCase(
      setJsonSettings.fulfilled,
      (state, action: PayloadAction<User>) => {
        if (state.authData) {
          state.authData.jsonSettings = action.payload.jsonSettings;
        }
      },
    );
    // builder.addCase(setJsonSettings.rejected, (state, action) => {
    //   state.isLoading = false;
    //   state.error = action.payload as string;
    // });
  },
});

export const { setAuthUserData, initAuthUserData, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
