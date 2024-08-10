import { StateSchema } from 'app/providers/StoreProvider';
import { getLoginState } from 'features/AuthByUsername/model/selectors/getLoginState';
import { LoginSchema } from 'features/AuthByUsername/model/types/loginSchema';

describe('getLoginState.test', () => {
  test('should return error', () => {
    const state: DeepPartial<StateSchema> = {
      login: {
        error: 'error',
      },
    };

    expect(getLoginState(state as StateSchema)).toEqual({ error: 'error' });
  });

  test('should return loading true', () => {
    const state: DeepPartial<StateSchema> = {
      login: {
        isLoading: true,
      },
    };

    expect(getLoginState(state as StateSchema)).toEqual({ isLoading: true });
  });

  test('should return user data', () => {
    const userData = {
      username: 'admin',
      password: '123',
    };

    const state: DeepPartial<StateSchema> = {
      login: userData,
    };

    expect(getLoginState(state as StateSchema)).toEqual(userData);
  });

  test('should return default state', () => {
    const defaultState: LoginSchema = {
      error: null,
      isLoading: false,
      password: '',
      username: '',
    };

    const state: DeepPartial<StateSchema> = {};

    expect(getLoginState(state as StateSchema)).toEqual(defaultState);
  });
});
