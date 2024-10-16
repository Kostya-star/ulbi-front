import { FeatureFlags } from '@/shared/types/featureFlags';

import { JsonSettings } from './jsonSettings';

export type UserRole = 'ADMIN' | 'USER' | 'MANAGER';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  role: UserRole[];
  features?: FeatureFlags;
  jsonSettings?: JsonSettings;
}

export interface UserSchema {
  authData: User | null;
  isInited: boolean;
}
