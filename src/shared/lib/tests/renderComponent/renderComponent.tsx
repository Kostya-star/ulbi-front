/* eslint-disable front-fresh/layers-imports */
import { ReactNode } from 'react';

import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';

import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
import { RootReducersType } from '@/app/providers/StoreProvider/config/StateSchema';
import { Theme, ThemeProvider } from '@/app/providers/ThemeProvider';
import i18nForTests from '@/shared/config/i18n/i18nForTests';
import '@/app/styles/index.scss';

export interface RenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
  theme?: Theme;
}

interface TestProviderProps {
  children: ReactNode;
  options?: RenderOptions;
}

export const TestProvider = ({ children, options = {} }: TestProviderProps) => {
  const { route = '/', initialState, asyncReducers, theme = Theme.DUSK_SERENITY } = options;

  return (
    <MemoryRouter initialEntries={[route]}>
      <StoreProvider asyncReducers={asyncReducers as RootReducersType} initialState={initialState as StateSchema}>
        <I18nextProvider i18n={i18nForTests}>
          <ThemeProvider initialTheme={theme}>
            <div className={`app ${theme}`}>{children}</div>
          </ThemeProvider>
        </I18nextProvider>
      </StoreProvider>
    </MemoryRouter>
  );
};

export function renderComponent(component: ReactNode, options: RenderOptions = {}) {
  return render(<TestProvider options={options}>{component}</TestProvider>);
}
