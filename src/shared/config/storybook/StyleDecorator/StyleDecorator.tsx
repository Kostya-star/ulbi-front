import { Story } from '@storybook/react';
import { Theme } from 'app/providers/ThemeProvider';
import "app/styles/index.scss";
import { FC } from 'react';

// export const StyleDecorator = (story: () => Story) => story();
export const StyleDecorator = (story: FC, theme: Theme) => {
  return <div className={`app ${theme}`}>{story()}</div>
}

// import { Story } from '@storybook/react';
// import "app/styles/index.scss";
// import "../../../../app/styles/index.scss";
// import { ThemeProvider, useTheme } from 'app/providers/ThemeProvider';
// import {
//   FC, ReactNode, useEffect, useState,
// } from 'react';
// import { DecoratorFunction } from '@storybook/addons';

// export function StyleDecorator(Story: FC) {
//   const [realTheme, setRealTheme] = useState('dark');
//   const { theme } = useTheme();

//   useEffect(() => {
//     console.log('theme', theme);
//     console.log('realTheme', realTheme);
//     if (theme) {
//       setRealTheme(theme);
//     }
//   }, [theme]);

//   return <div className={`app ${realTheme}`}><Story /></div>;
// }
