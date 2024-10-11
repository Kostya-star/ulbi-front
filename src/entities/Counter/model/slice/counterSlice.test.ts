// import { counterReducer, useCounterActions } from './counterSlice';
import { CounterSchema } from '../types/counterSchema';

describe('counterSlice.test', () => {
  test('increment action', () => {
    const counterState: CounterSchema = { value: 10 };
    // const { increment } = useCounterActions();

    // expect(counterReducer(counterState, increment())).toEqual({ value: 11 });
  });

  test('decrement action', () => {
    const counterState: CounterSchema = { value: 10 };
    // const { decrement } = useCounterActions();

    // expect(counterReducer(counterState, decrement())).toEqual({ value: 9 });
  });

  test('with state undefined increment action', () => {
    // const { increment } = useCounterActions();

    // expect(counterReducer(undefined, increment())).toEqual({ value: 1 });
  });

  test('with state undefined decrement action', () => {
    // const { decrement } = useCounterActions();

    // expect(counterReducer(undefined, decrement())).toEqual({ value: -1 });
  });
});
