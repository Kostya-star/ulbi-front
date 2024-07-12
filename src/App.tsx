import { Route, Routes } from 'react-router-dom';
import './styles/index.scss';
import { Link } from 'react-router-dom';
import { MainPageAsync } from './pages/MainPage/MainPageAsync';
import { AboutPageAsync } from './pages/AboutPage/AboutPageAsync';
import { Suspense } from 'react';
import { useTheme } from './theme/useTheme';
import { classNames } from './helpers/classNames/classNames';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', {hovered: true, selectable: Boolean(23)}, [theme, 'extra-class'])}>
      <Link to="/">Main</Link>
      <Link to="/about">About</Link>
      <button onClick={toggleTheme}>change theme</button>
      <Suspense fallback={<div>page is loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPageAsync />} />
          <Route path="/about" element={<AboutPageAsync />} />
        </Routes>
      </Suspense>
    </div>
  );
}
