import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { setAuthUserData } from 'entities/User';
import { User } from 'entities/User/model/types/user';
import i18n from 'shared/config/i18n/i18n';
import { USER_DATA_LOCAL_STORAGE } from 'shared/const/localStorage';
import { LoginSchema } from '../../types/LoginSchema';

type loginByUserNamePayload = Pick<LoginSchema, 'username' | 'password'>;

export const loginByUserName = createAsyncThunk<User, loginByUserNamePayload, { rejectValue: string }>(
  'login/loginByUserName',
  async (loginUserData, thunkAPI) => {
    try {
      const dbUser = await axios.post<User>('http://localhost:8000/login', loginUserData);

      if (!dbUser.data) throw new Error();

      thunkAPI.dispatch(setAuthUserData(dbUser.data));
      window.localStorage.setItem(USER_DATA_LOCAL_STORAGE, JSON.stringify(dbUser.data));

      return dbUser.data;
    } catch (err) {
      console.log(err);
      return thunkAPI.rejectWithValue(i18n.t('wrong_auth_data'));
    }
  },
);
