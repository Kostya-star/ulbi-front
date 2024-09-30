import { setAuthUserData, User } from '@/entities/User';
import { TestAsyncThunk } from '@/shared/lib/tests/TestAsyncThunk/TestAsyncThunk';
import { loginByUserName } from './loginByUserName';

describe('loginByUserName.test', () => {
  test('success login', async () => {
    const authUserData: User = { username: '123', id: '1', role: ['ADMIN'] };

    const thunk = new TestAsyncThunk(loginByUserName);
    thunk.api.post.mockReturnValue(Promise.resolve({ data: authUserData }));
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('fulfilled');
    expect(result.payload).toEqual(authUserData);
    expect(thunk.dispatch).toHaveBeenCalledWith(setAuthUserData(authUserData));
    expect(thunk.dispatch).toHaveBeenCalledTimes(3);
  });

  test('error login', async () => {
    const thunk = new TestAsyncThunk(loginByUserName);
    thunk.api.post.mockReturnValue(Promise.resolve({ status: 403 }));
    const result = await thunk.callThunk({ username: '123', password: '123' });

    expect(thunk.api.post).toHaveBeenCalled();
    expect(result.meta.requestStatus).toBe('rejected');
    expect(result.payload).toBe('error');
    expect(thunk.dispatch).toHaveBeenCalledTimes(2);
  });
});
