import { createSelector } from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';

export const getUserRoles = (state: StateSchema) => state.user.authData?.role; // a user can have multiple roles

export const isUserAdmin = createSelector(
  getUserRoles,
  (roles) => !!roles?.includes('ADMIN'),
);
export const isUserManager = createSelector(
  getUserRoles,
  (roles) => !!roles?.includes('MANAGER'),
);
