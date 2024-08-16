import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';
import { Suspense, useEffect, useState } from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { initAuthUserData } from 'entities/User';
import { AppRouter } from './providers/router';

export function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();

  const [isInited, setInited] = useState(false);

  useEffect(() => {
    dispatch(initAuthUserData());
    setInited(true);
  }, [dispatch]);

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback=''>
        <Navbar />
        <div className='content-page'>
          <Sidebar />
          {isInited && <AppRouter />}
        </div>
      </Suspense>
    </div>
  );
}
