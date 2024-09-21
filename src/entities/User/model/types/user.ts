export type UserRole = 'ADMIN' | 'USER' | 'MANAGER';

export interface User {
  id: string;
  username: string;
  avatar?: string;
  role: UserRole[];
}

export interface UserSchema {
  authData: User | null;
}
