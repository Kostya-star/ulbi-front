import { Route, Routes } from 'react-router-dom';
import 'app/styles/index.scss';
import { Link } from 'react-router-dom';
import { Suspense } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', { hovered: true, selectable: Boolean(23) }, [theme, 'extra-class'])}>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <button onClick={toggleTheme}>change theme</button>
      <AppRouter />
    </div>
  );
}
