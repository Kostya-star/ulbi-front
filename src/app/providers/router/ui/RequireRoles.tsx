import { memo, useMemo } from 'react';

import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { RoutePath } from '@/app/providers/router/model/config/routeConfig';
import { getUserRoles, UserRole } from '@/entities/User';

interface RequireRolesProps {
  children: JSX.Element;
  roles?: UserRole[]
}

export const RequireRoles = memo(({ children, roles }: RequireRolesProps) => {
  const location = useLocation();
  const userRoles = useSelector(getUserRoles);

  const hasAccessByRoles = useMemo(() => {
    if (!roles) return true;
    if (!userRoles) return false;
    return userRoles.some((role) => roles.includes(role));
  }, [roles, userRoles]);

  if (!hasAccessByRoles) {
    return <Navigate to={RoutePath.forbidden} state={{ from: location }} replace />;
  }

  return children;
});
