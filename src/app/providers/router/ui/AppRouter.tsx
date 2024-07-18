import { Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routeConfig } from 'shared/config/routeConfig/routeConfig';
import { PageLoader } from 'widgets/PageLoader';

export default function AppRouter() {
  return (
    <Routes>
      {Object.values(routeConfig).map(({ path, element }) => (
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
