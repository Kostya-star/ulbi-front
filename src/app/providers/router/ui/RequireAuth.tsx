import { memo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from '@/app/providers/router/model/config/routeConfig';
import { getAuthUserData } from '@/entities/User';

interface RequireAuthProps {
  children: JSX.Element;
  authOnly?: boolean
}

export const RequireAuth = memo(({ children, authOnly }: RequireAuthProps) => {
  const isAuth = useSelector(getAuthUserData);
  const location = useLocation();

  if (authOnly && !isAuth) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
  }

  return children;
});
