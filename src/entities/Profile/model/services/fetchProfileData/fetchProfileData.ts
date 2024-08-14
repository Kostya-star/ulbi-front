import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, undefined, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (_, { extra, rejectWithValue }) => {
    try {
      const profile = await extra.api.get<Profile>('/profile');

      if (!profile.data) throw new Error();

      return profile.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
