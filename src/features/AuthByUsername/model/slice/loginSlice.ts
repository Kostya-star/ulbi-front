import { createSlice } from '@reduxjs/toolkit';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { SchemaLogin } from '../types/SchemaLogin';

const initialState: SchemaLogin = {
  username: null,
  password: null,
  isLoading: false,
  error: null,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(loginByUserName.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginByUserName.fulfilled, (state) => {
      state.isLoading = false;
      state.error = null;
      // state.username = action.payload.username;
    });
    builder.addCase(loginByUserName.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  },
});

// export const { setUsername, setPassword } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
