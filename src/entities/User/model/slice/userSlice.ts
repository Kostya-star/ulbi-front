import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { USER_DATA_LOCAL_STORAGE } from 'shared/const/localStorage';
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
    },
    initAuthUserData: (state) => {
      const userData = localStorage.getItem(USER_DATA_LOCAL_STORAGE);

      if (userData) {
        state.authData = JSON.parse(userData);
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
