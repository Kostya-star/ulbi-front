import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';

import { getAuthUserData } from '../selectors/getAuthUserData';
import { getJsonSettings } from '../selectors/getJsonSettings';
import { JsonSettings } from '../types/jsonSettings';
import { User } from '../types/user';

export const setJsonSettings = createAsyncThunk<
  User,
  JsonSettings,
  ThunkConfig<string>
>(
  'profile/setJsonSettings',
  async (newJsonSettings, { extra, getState, rejectWithValue }) => {
    const userData = getAuthUserData(getState());
    const oldJsonSettings = getJsonSettings(getState());

    try {
      const { data: updatedUser } = await extra.api.patch<User>(
        `/users/${userData?.id}`,
        {
          jsonSettings: {
            ...oldJsonSettings,
            ...newJsonSettings,
          },
        },
      );

      return updatedUser;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
