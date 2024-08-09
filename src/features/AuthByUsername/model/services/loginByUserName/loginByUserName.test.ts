import axios from 'axios';
import { setAuthUserData } from 'entities/User';
import { loginByUserName } from 'features/AuthByUsername/model/services/loginByUserName/loginByUserName';
import { TestAsyncThunk } from 'shared/lib/tests/TestAsyncThunk/TestAsyncThunk';

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

describe('loginByUserName.test', () => {
  test('success login', async () => {
    const authUserData = { username: '123', id: '1' };
    mockedAxios.post.mockReturnValue(Promise.resolve({ data: authUserData }));

    const thunk = new TestAsyncThunk(loginByUserName);
    const result = await thunk.callThunk({ username: '123', password: '123' });

    // expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(authUserData);
    expect(thunk.dispatch).toHaveBeenCalledWith(setAuthUserData(authUserData));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
  });

  test('error login', async () => {
    mockedAxios.post.mockReturnValue(Promise.resolve({ status: 403 }));

    const thunk = new TestAsyncThunk(loginByUserName);
    const result = await thunk.callThunk({ username: '123', password: '123' });

    // expect(mockedAxios.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  });
});
