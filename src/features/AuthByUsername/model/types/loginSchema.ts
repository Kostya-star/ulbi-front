export interface LoginSchema {
  username: string | null;
  password: string | null;
  isLoading: boolean;
  error: string | null;
}
