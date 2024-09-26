import type { User } from 'entities/User';

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  user: User;
  userId: string;
  href?: string;
}
