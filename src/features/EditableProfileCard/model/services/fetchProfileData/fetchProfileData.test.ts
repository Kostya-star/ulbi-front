import { Country } from '@/entities/CountrySelect';
import { Currency } from '@/entities/CurrencySelect';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

import { fetchProfileData } from '../../services/fetchProfileData/fetchProfileData';

const defaultProfileData = {
  first: 'Constantin',
  lastname: 'Danilov',
  age: 24,
  city: 'Bender',
  country: Country.Moldova,
  currency: Currency.MD,
  username: 'admin',
  avatar: '',
};

describe('fetchProfileData.test', () => {
  test('success', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(
      Promise.resolve({ data: defaultProfileData }),
    );
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(defaultProfileData);
  });

  test('error', async () => {
    const thunk = new TestAsyncThunk(fetchProfileData);
    thunk.api.get.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk('1');

    expect(thunk.api.get).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
  });
});
