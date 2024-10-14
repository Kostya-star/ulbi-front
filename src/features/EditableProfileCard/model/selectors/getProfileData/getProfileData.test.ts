import { StateSchema } from '@/app/providers/StoreProvider';
import { Country } from '@/entities/CountrySelect';
import { Currency } from '@/entities/CurrencySelect';

import { getProfileData } from './getProfileData';

describe('getProfileData', () => {
  test('should return profile data', () => {
    const data = {
      first: 'Constantin',
      lastname: 'Danilov',
      age: 24,
      city: 'Bender',
      country: Country.Moldova,
      currency: Currency.MD,
      username: 'admin',
      avatar: '',
    };

    const state: DeepPartial<StateSchema> = {
      profile: {
        data,
      },
    };

    expect(getProfileData(state as StateSchema)).toEqual(data);
  });

  test('should return profile data undefined', () => {
    const state: DeepPartial<StateSchema> = {};

    expect(getProfileData(state as StateSchema)).toEqual(undefined);
  });
});
