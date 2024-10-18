import { Suspense, useEffect } from 'react';

import { useSelector } from 'react-redux';

import { useTheme } from '@/app/providers/ThemeProvider';
import {
  getAuthIsInited,
  getUserDataById as initAuthData,
} from '@/entities/User';
import { GreetingModal } from '@/features/GreetingModal';
import { useAppDispatch } from '@/shared/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import { Navbar } from '@/widgets/Navbar';
import { PageLoader } from '@/widgets/PageLoader';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

export function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const isAuthInited = useSelector(getAuthIsInited);

  useEffect(() => {
    if (isAuthInited) return;
    dispatch(initAuthData());
  }, [isAuthInited, dispatch]);

  if (!isAuthInited) return <PageLoader />;

  return (
    <div className={classNames('app', {}, [theme])}>
      <Suspense fallback="">
        <Navbar />
        <div className="content-page">
          <Sidebar />
          {isAuthInited && <AppRouter />}
        </div>
        <GreetingModal />
      </Suspense>
    </div>
  );
}
