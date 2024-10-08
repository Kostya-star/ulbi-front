import { Country } from '@/entities/CountrySelect';
import { Currency } from '@/entities/CurrencySelect';

import { profileReducer } from './profileSlice';
import { updateProfileData } from '../services/updateProfileData/updateProfileData';
import { ProfileSchema } from '../types/profile';

const data = {
  first: 'Constantin!',
  lastname: "Danilov!",
  age: 25,
  city: "Bender!",
  country: Country.Holland,
  currency: Currency.RUB,
  username: 'admin!',
  avatar: '!',
};

describe('updateProfileData.test', () => {
  test('extraReducers: updateProfileData.pending', async () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: false,
      error: 'error',
    };

    expect(profileReducer(state as ProfileSchema, updateProfileData.pending))
      .toEqual({ isLoading: true, error: null });
  });

  test('extraReducers: updateProfileData.fulfilled', async () => {
    const state: DeepPartial<ProfileSchema> = {
      isLoading: true,
      error: null,
      data: null,
    };

    expect(
      profileReducer(state as ProfileSchema, updateProfileData.fulfilled(data, '', data)),
    )
      .toEqual({
        isLoading: false,
        error: null,
        data,
      });
  });
});
