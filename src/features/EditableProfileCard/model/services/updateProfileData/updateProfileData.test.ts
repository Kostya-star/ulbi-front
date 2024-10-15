import { Country } from '@/entities/CountrySelect';
import { Currency } from '@/entities/CurrencySelect';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { updateProfileData } from '../../services/updateProfileData/updateProfileData';

const defaultProfileData = {
  id: '1',
  first: 'Constantin!',
  lastname: 'Danilov!',
  age: 25,
  city: 'Bender!',
  country: Country.Holland,
  currency: Currency.RUB,
  username: 'admin!',
  avatar: '!',
};

describe('updateProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(updateProfileData);
    thunk.api.patch.mockReturnValue(
      Promise.resolve({ data: defaultProfileData }),
    );
    const result = await thunk.callThunk(defaultProfileData);

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(defaultProfileData);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(updateProfileData);
    thunk.api.patch.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk(defaultProfileData);

    expect(thunk.api.patch).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
