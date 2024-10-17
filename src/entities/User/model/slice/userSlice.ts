import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

import { getUserDataById } from '../services/getUserDataById';
import { setJsonSettings } from '../services/setJsonSettings';
import { User, UserSchema } from '../types/user';

const initialState: UserSchema = {
  authData: null,
  isInited: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAuthUserData: (state, action: PayloadAction<User>) => {
      state.authData = action.payload;
      setFeatureFlags(action.payload.features);
      localStorage.setItem(
        USER_DATA_LOCAL_STORAGE,
        JSON.stringify(action.payload.id),
      );
    },
    logout: (state) => {
      state.authData = null;
      localStorage.removeItem(USER_DATA_LOCAL_STORAGE);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      setJsonSettings.fulfilled,
      (state, action: PayloadAction<User>) => {
        if (state.authData) {
          state.authData.jsonSettings = action.payload.jsonSettings;
        }
      },
    );
    builder.addCase(
      getUserDataById.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.authData = action.payload;
        state.isInited = true;
        setFeatureFlags(action.payload.features);
      },
    );
    builder.addCase(getUserDataById.rejected, (state) => {
      state.isInited = true;
    });
  },
});

export const { setAuthUserData, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
