import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const updateProfileData = createAsyncThunk<Profile, Profile, ThunkConfig<string>>(
  'profile/updateProfileData',
  async (profileEdits, { extra, rejectWithValue }) => {
    try {
      const profile = await extra.api.patch<Profile>('/profile', profileEdits);

      if (!profile.data) throw new Error();

      return profile.data;
    } catch (err) {
      return rejectWithValue('error');
    }
  },
);
