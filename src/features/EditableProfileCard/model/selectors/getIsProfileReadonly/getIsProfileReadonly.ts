import { StateSchema } from 'app/providers/StoreProvider';

export const getIsProfileReadonly = (state: StateSchema) => state.profile?.readonly;
