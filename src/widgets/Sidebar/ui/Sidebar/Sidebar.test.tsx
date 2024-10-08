import { fireEvent, screen } from '@testing-library/react';

import { renderComponent } from '@/shared/lib/tests/renderComponent/renderComponent';

import { Sidebar } from './Sidebar';

describe('Sidebar', () => {
  test('to be in the document', () => {
    renderComponent(<Sidebar />);
    expect(screen.getByTestId('sidebar')).toBeInTheDocument();
  });

  test('test sidebar width collapsing', () => {
    renderComponent(<Sidebar />);
    const sidebarEl = screen.getByTestId('sidebar');
    expect(sidebarEl).not.toHaveClass('collapsed');

    const toggleSidebarWidthBtn = screen.getByTestId('toggle-sidebar-width-btn');
    fireEvent.click(toggleSidebarWidthBtn);
    expect(sidebarEl).toHaveClass('collapsed');
  });
});
