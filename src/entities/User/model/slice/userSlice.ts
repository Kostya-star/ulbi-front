import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { setFeatureFlags } from '@/shared/lib/features';

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
});

export const { setAuthUserData, initAuthUserData, logout } = userSlice.actions;

export const userReducer = userSlice.reducer;
