import { render, screen } from '@testing-library/react';

import { Button, ButtonTheme } from './Button';

describe('Button', () => {
  test('to be in the document', () => {
    render(<Button>btn text</Button>);
    expect(screen.getByText('btn text')).toBeInTheDocument();
  });

  test("to have class 'clear'", () => {
    render(<Button theme={ButtonTheme.CLEAR}>btn text</Button>);
    expect(screen.getByText('btn text')).toHaveClass('clear');
    screen.debug();
  });
});
