import { Suspense, useEffect, useState } from 'react';

import { useTheme } from '@/app/providers/ThemeProvider';
import { initAuthUserData } from '@/entities/User';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

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
