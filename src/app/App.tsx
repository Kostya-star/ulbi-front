import 'app/styles/index.scss';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTheme } from 'app/providers/ThemeProvider';
import { AppRouter } from './providers/router';
import { Navbar } from 'widgets/Navbar';

export function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={classNames('app', { hovered: true, selectable: Boolean(23) }, [theme, 'extra-class'])}>
      <Navbar />
      <button onClick={toggleTheme}>change theme</button>
      <AppRouter />
    </div>
  );
}
