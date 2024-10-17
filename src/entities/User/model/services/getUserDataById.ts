import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';

import { User } from '../types/user';

export const getUserDataById = createAsyncThunk<
  User,
  void,
  ThunkConfig<string>
>('user/getUserDataById', async (_, { extra, rejectWithValue }) => {
  const userId = localStorage.getItem(USER_DATA_LOCAL_STORAGE);

  if (!userId) return rejectWithValue('');

  try {
    const { data: user } = await extra.api.get<User>(
      `/users/${JSON.parse(userId)}`,
    );

    return user;
  } catch (err) {
    console.log(err);
    return rejectWithValue('error');
  }
});
