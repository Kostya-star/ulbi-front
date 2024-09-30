import { Profile } from '@/entities/Profile';

export interface ProfileSchema {
  data: Profile | null;
  isLoading: boolean;
  error: string | null;
  readonly: boolean;
}
