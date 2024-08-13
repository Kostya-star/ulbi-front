import { getAuthUserData } from 'entities/User';
import { memo, Suspense, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

function AppRouter() {
  const isAuth = useSelector(getAuthUserData);

  const routes = useMemo(() => Object.values(routeConfig).filter((route) => {
    if (route.authOnly && !isAuth) return false;
    return true;
  }), [isAuth]);

  return (
    <Routes>
      {routes.map(({ path, element }) => (
        <Route
          key={path}
          path={path}
          element={(
            <div className='page-wrapper'>
              <Suspense fallback={<PageLoader />}>
                {element}
              </Suspense>
            </div>
          )}
        />
      ))}
    </Routes>
  );
}

export default memo(AppRouter);
