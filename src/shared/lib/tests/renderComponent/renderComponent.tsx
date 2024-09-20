import { ReducersMapObject } from '@reduxjs/toolkit';
import { render } from '@testing-library/react';
import { StateSchema, StoreProvider } from 'app/providers/StoreProvider';
import { RootReducersType } from 'app/providers/StoreProvider/config/StateSchema';
import { ReactNode } from 'react';
import { I18nextProvider } from 'react-i18next';
import { MemoryRouter } from 'react-router-dom';
import i18nForTests from 'shared/config/i18n/i18nForTests';

export interface RenderOptions {
  route?: string;
  initialState?: DeepPartial<StateSchema>;
  asyncReducers?: DeepPartial<ReducersMapObject<StateSchema>>;
}

export function renderComponent(component: ReactNode, options: RenderOptions = {}) {
  const { route = '/', initialState } = options;

  return render(
    <StoreProvider
      asyncReducers={options.asyncReducers as RootReducersType}
      initialState={initialState as StateSchema}
    >
      <MemoryRouter initialEntries={[route]}>
        <I18nextProvider i18n={i18nForTests}>
          {component}
        </I18nextProvider>
      </MemoryRouter>
      ,
    </StoreProvider>,
  );
}
