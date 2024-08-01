import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { User } from 'entities/User/model/types/user';
import { LoginSchema } from '../../types/LoginSchema';

type loginByUserNamePayload = Pick<LoginSchema, 'username' | 'password'>;

export const loginByUserName = createAsyncThunk<User, loginByUserNamePayload, { rejectValue: string }>(
  'login/loginByUserName',
  async (loginUserData, thunkAPI) => {
    try {
      const dbUser = await axios.post<User>('http://localhost:8000/login', loginUserData);

      if (!dbUser.data) throw new Error();

      return dbUser.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue('Wrong name or password');
    }
  },
);
