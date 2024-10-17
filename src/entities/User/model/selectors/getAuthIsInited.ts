import { StateSchema } from '@/app/providers/StoreProvider';

export const getAuthIsInited = (state: StateSchema) =>
  state.user.isInited ?? false;
