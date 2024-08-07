import { createSlice } from '@reduxjs/toolkit';
import { loginByUserName } from '../services/loginByUserName/loginByUserName';
import { LoginSchema } from '../types/LoginSchema';

const initialState: LoginSchema = {
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
      state.error = action.payload;
    });
  },
});

// export const { setUsername, setPassword } = loginSlice.actions;

export const loginReducer = loginSlice.reducer;
