import { StateSchema } from '@/app/providers/StoreProvider';

import { LoginSchema } from '../types/LoginSchema';

const defaultLoginState: LoginSchema = {
  error: null,
  isLoading: false,
  password: '',
  username: '',
};

export const getLoginState = (state: StateSchema) =>
  state.login ?? defaultLoginState;
