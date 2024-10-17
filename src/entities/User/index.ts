export type { UserSchema, User, UserRole } from './model/types/user';
export { userReducer } from './model/slice/userSlice';
export { setAuthUserData, logout } from './model/slice/userSlice';
export { getAuthUserData } from './model/selectors/getAuthUserData';
export { getAuthIsInited } from './model/selectors/getAuthIsInited';
export {
  isUserAdmin,
  isUserManager,
  getUserRoles,
} from './model/selectors/roleSelectors';

export { setJsonSettings } from './model/services/setJsonSettings';
export { useJsonSettings } from './model/selectors/getJsonSettings';
export { getUserDataById } from './model/services/getUserDataById';
