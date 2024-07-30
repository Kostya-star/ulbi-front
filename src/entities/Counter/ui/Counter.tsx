/* eslint-disable i18next/no-literal-string */
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { getCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { decrement, increment } from '../model/slice/counterSlice';

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = () => {
  const counterVal = useSelector(getCounterValue);
  const dispatch = useDispatch();
  const onIncrement = () => dispatch(increment());
  const onDecrement = () => dispatch(decrement());
  return (
    <div>
      value =
      <h1 data-testid='counter-value'>
        {counterVal}
      </h1>

      <Button data-testid='button-increment' onClick={onIncrement}>
        increment
      </Button>
      <Button data-testid='button-decrement' onClick={onDecrement}>
        decrement
      </Button>
    </div>
  );
};
