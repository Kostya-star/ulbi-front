import { StateSchema } from 'app/providers/StoreProvider';
import { SchemaLogin } from '../types/SchemaLogin';

const defaultLoginState: SchemaLogin = {
  error: null,
  isLoading: false,
  password: '',
  username: '',
};

export const getLoginState = (state: StateSchema) => state.login ?? defaultLoginState;
