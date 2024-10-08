import { counterReducer, increment, decrement } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice.test', () => {
  test('increment action', () => {
    const counterState: CounterSchema = { value: 10 };

    expect(counterReducer(counterState, increment())).toEqual({ value: 11 });
  });

  test('decrement action', () => {
    const counterState: CounterSchema = { value: 10 };

    expect(counterReducer(counterState, decrement())).toEqual({ value: 9 });
  });

  test('with state undefined increment action', () => {
    expect(counterReducer(undefined, increment())).toEqual({ value: 1 });
  });

  test('with state undefined decrement action', () => {
    expect(counterReducer(undefined, decrement())).toEqual({ value: -1 });
  });
});
