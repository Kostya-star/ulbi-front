import { createSlice } from '@reduxjs/toolkit';
import { UserSchema } from '../types/user';

const initialState: UserSchema = {};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
});

// export const {} = counterSlice.actions;

export const userReducer = userSlice.reducer;
