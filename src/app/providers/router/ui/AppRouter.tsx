import { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from '@/shared/config/routeConfig/routeConfig';
import { PageLoader } from '@/widgets/PageLoader';
import { RequireAuth } from './RequireAuth';
import { RequireRoles } from './RequireRoles';

function AppRouter() {
  const routesList = useMemo(() => {
    return Object.values(routeConfig).map((route) => {
      const element = (
        <Suspense fallback={<PageLoader />}>
          {route.element}
        </Suspense>
      );

      return (
        <Route
          key={route.path}
          path={route.path}
          element={(
            <RequireAuth authOnly={route.authOnly}>
              <RequireRoles roles={route.role}>
                {element}
              </RequireRoles>
            </RequireAuth>
        )}
        />
      );
    });
  }, []);

  return (
    <Routes>
      {routesList}
    </Routes>
  );
}

export default memo(AppRouter);
