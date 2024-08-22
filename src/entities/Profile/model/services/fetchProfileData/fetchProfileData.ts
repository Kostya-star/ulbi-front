import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
import { Profile } from '../../types/profile';

export const fetchProfileData = createAsyncThunk<Profile, string, ThunkConfig<string>>(
  'profile/fetchProfileData',
  async (profileId, { extra, rejectWithValue }) => {
    try {
      const profile = await extra.api.get<Profile>(`/profile/${profileId}`);

      if (!profile.data) throw new Error();

      return profile.data;
    } catch (err) {
      console.log(err);
      return rejectWithValue('error');
    }
  },
);
