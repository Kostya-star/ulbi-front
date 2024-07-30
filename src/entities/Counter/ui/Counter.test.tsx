import { screen } from '@testing-library/react';
import { userEvent } from '@storybook/testing-library';
import { renderComponent } from 'shared/lib/tests/renderComponent/renderComponent';
import { Counter } from './Counter';

describe('Counter.test', () => {
  test('test change value', () => {
    renderComponent(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    const counterValue = screen.getByTestId('counter-value');
    expect(counterValue).toHaveTextContent('10');
  });

  test('increment value', () => {
    renderComponent(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    const incrementBtn = screen.getByTestId('button-increment');
    const counterValue = screen.getByTestId('counter-value');

    userEvent.click(incrementBtn);

    expect(counterValue).toHaveTextContent('11');
  });

  test('decrement value', () => {
    renderComponent(<Counter />, {
      initialState: { counter: { value: 10 } },
    });

    const decrementBtn = screen.getByTestId('button-decrement');
    const counterValue = screen.getByTestId('counter-value');

    userEvent.click(decrementBtn);

    expect(counterValue).toHaveTextContent('9');
  });
});
