import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { initAuthUserData } from 'entities/User';
import { AppRouter } from './providers/router';

export function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initAuthUserData());
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          <AppRouter />
        </div>
      </Suspense>
    </div>
  );
}
