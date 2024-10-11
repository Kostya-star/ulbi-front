import { screen } from '@testing-library/react';

import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent';

import { AppRouter } from './AppRouter';
import {
  getRouteAbout, getRouteAdminPanel, getRouteMain, getRouteProfile,
} from '../model/config/routeConfig';

describe('app/providers/router/ui/AppRouter', () => {
  test('AboutPage should be rendered(no auth)', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAbout(),
    });

    const aboutPage = await screen.findByTestId('AboutPage');
    expect(aboutPage).toBeInTheDocument();
  });
  test('MainPage should be rendered(no auth)', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteMain(),
    });

    const mainPage = await screen.findByTestId('MainPage');
    expect(mainPage).toBeInTheDocument();
  });
  test('ProfilePage should be rendered(with auth)', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { authData: {} },
      },
    });

    const profilePage = await screen.findByTestId('ProfilePage');
    expect(profilePage).toBeInTheDocument();
  });
  test('Request for ProfilePage but redirected to ForbiddenPage(no auth)', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteProfile('1'),
      initialState: {
        user: { authData: null },
      },
    });

    const forbiddenPage = await screen.findByTestId('ForbiddenPage');
    expect(forbiddenPage).toBeInTheDocument();
  });
  test('render NotFoundPage', async () => {
    renderComponent(<AppRouter />, {
      route: '/qwertyuioplkjhgfdsasxcvbnm,',
    });

    const notFoundPage = await screen.findByTestId('NotFoundPage');
    expect(notFoundPage).toBeInTheDocument();
  });
  test('render AdminPanelPage with ADMIN role', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          authData: { role: ['ADMIN'] },
        },
      },
    });

    const adminPanelPage = await screen.findByTestId('AdminPanelPage');
    expect(adminPanelPage).toBeInTheDocument();
  });
  test('render AdminPanelPage with MANAGER', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          authData: { role: ['MANAGER'] },
        },
      },
    });

    const adminPanelPage = await screen.findByTestId('AdminPanelPage');
    expect(adminPanelPage).toBeInTheDocument();
  });
  test('requested AdminPanelPage but redirected to ForbiddenPage coz no role was provided', async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          authData: {},
        },
      },
    });

    const forbiddenPage = await screen.findByTestId('ForbiddenPage');
    expect(forbiddenPage).toBeInTheDocument();
  });
  test("requested AdminPanelPage but redirected to ForbiddenPage coz 'User' role was provided", async () => {
    renderComponent(<AppRouter />, {
      route: getRouteAdminPanel(),
      initialState: {
        user: {
          authData: { role: ['USER'] },
        },
      },
    });

    const forbiddenPage = await screen.findByTestId('ForbiddenPage');
    expect(forbiddenPage).toBeInTheDocument();
  });
});
