import { RouteProps } from 'react-router-dom';

import { UserRole } from '@/entities/User';

export type AppRouteProps = RouteProps & {
  authOnly?: boolean;
  role?: UserRole[];
}

export enum AppRoutes {
  MAIN = 'main',
  ABOUT = 'about',
  PROFILE = 'profile',
  ARTICLES = 'articles',
  ARTICLE_DETAILS = 'article_details',
  ARTICLE_CREATE = 'article_create',
  ARTICLE_EDIT = 'article_edit',
  ADMIN_PANEL = 'admin_panel',
  FORBIDDEN_CONTENT = 'forbidden',

  // last
  NOT_FOUND = 'not_found'
}
