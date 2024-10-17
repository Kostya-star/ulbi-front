import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { setAuthUserData } from '@/entities/User';
import type { User } from '@/entities/User';

import { LoginSchema } from '../../types/LoginSchema';

type loginByUserNamePayload = Pick<LoginSchema, 'username' | 'password'>;

export const loginByUserName = createAsyncThunk<
  User,
  loginByUserNamePayload,
  ThunkConfig<string>
>(
  'login/loginByUserName',
  async (loginUserData, { extra, dispatch, rejectWithValue }) => {
    try {
      const dbUser = await extra.api.post<User>('/login', loginUserData);

      if (!dbUser.data) throw new Error();

      dispatch(setAuthUserData(dbUser.data));

      return dbUser.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
