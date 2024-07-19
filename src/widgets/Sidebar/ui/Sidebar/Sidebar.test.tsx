import { fireEvent, screen } from '@testing-library/react';
import { Sidebar } from 'widgets/Sidebar/index';

import {
  renderWithTranslation,
} from 'shared/lib/tests/renderWithTranslation/renderWithTranslation';

describe('Sidebar', () => {
  test('to be in the document', () => {
    renderWithTranslation(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test sidebar width collapsing', () => {
    renderWithTranslation(<Sidebar />);
    const sidebarEl = screen.getByTestId('sidebar');
    expect(sidebarEl).not.toHaveClass('collapsed');

    const toggleSidebarWidthBtn = screen.getByTestId('toggle-sidebar-width-btn');
    fireEvent.click(toggleSidebarWidthBtn);
    expect(sidebarEl).toHaveClass('collapsed');
  });
});
