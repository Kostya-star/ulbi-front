import { lazy } from 'react';

// export const MainPageAsync = lazy(() => import('./MainPage'));

export const ProfilePageAsync = lazy(() => new Promise((resolve) => {
  // @ts-ignore
  setTimeout(() => resolve(import('./ProfilePage')), 1000);
}));
