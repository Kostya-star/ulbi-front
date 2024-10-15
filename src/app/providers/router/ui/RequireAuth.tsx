import { memo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getAuthUserData } from '@/entities/User';

import { getRouteForbidden } from '../model/config/routeConfig';

interface RequireAuthProps {
  children: JSX.Element;
  authOnly?: boolean;
}

export const RequireAuth = memo(({ children, authOnly }: RequireAuthProps) => {
  const isAuth = useSelector(getAuthUserData);
  const location = useLocation();

  if (authOnly && !isAuth) {
    return (
      <Navigate to={getRouteForbidden()} state={{ from: location }} replace />
    );
  }

  return children;
});
