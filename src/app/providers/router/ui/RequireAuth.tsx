import { getAuthUserData } from 'entities/User';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';

interface RequireAuthProps {
  children: JSX.Element;
}

export const RequireAuth = memo(({ children }: RequireAuthProps) => {
  const isAuth = useSelector(getAuthUserData);
  const location = useLocation();

  if (!isAuth) return <Navigate to={RoutePath.main} state={{ from: location }} replace />;

  return children;
});
