import { memo, Suspense, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';
import { RequireAuth } from './RequireAuth';

function AppRouter() {
  const routesList = useMemo(() => {
    return Object.values(routeConfig).map((route) => {
      const element = (
        <div className='page-wrapper'>
          <Suspense fallback={<PageLoader />}>
            {route.element}
          </Suspense>
        </div>
      );

      return (
        <Route
          key={route.path}
          path={route.path}
          element={route.authOnly ? <RequireAuth>{element}</RequireAuth> : element}
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
