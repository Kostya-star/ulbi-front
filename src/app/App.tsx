import 'app/styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';
import { Sidebar } from 'widgets/Sidebar';

export function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames('app', { hovered: true, selectable: Boolean(23) }, [theme, 'extra-class'])}>
      <Navbar />
      <div className='content-page'>
        <Sidebar />
        <AppRouter />
      </div>
    </div>
  );
}
