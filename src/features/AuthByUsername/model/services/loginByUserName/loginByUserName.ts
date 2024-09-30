import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from '@/app/providers/StoreProvider';
import { setAuthUserData } from '@/entities/User';
import { User } from '@/entities/User/model/types/user';
import { USER_DATA_LOCAL_STORAGE } from '@/shared/const/localStorage';
import { LoginSchema } from '../../types/LoginSchema';

type loginByUserNamePayload = Pick<LoginSchema, 'username' | 'password'>;

export const loginByUserName = createAsyncThunk<User, loginByUserNamePayload, ThunkConfig<string>>(
  'login/loginByUserName',
  async (loginUserData, { extra, dispatch, rejectWithValue }) => {
    try {
      const dbUser = await extra.api.post<User>('/login', loginUserData);

      if (!dbUser.data) throw new Error();

      dispatch(setAuthUserData(dbUser.data));
      localStorage.setItem(USER_DATA_LOCAL_STORAGE, JSON.stringify(dbUser.data));

      return dbUser.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
