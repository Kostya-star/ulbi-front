/* eslint-disable i18next/no-literal-string */
import { FC } from 'react';

import { Button } from '@/shared/ui/Button';

import { useCounterValue } from '../model/selectors/getCounterValue/getCounterValue';
import { useCounterActions } from '../model/slice/counterSlice';

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = () => {
  const counterVal = useCounterValue();
  const { increment, decrement, incrementBy } = useCounterActions();

  const onIncrement = () => increment();
  const onDecrement = () => decrement();
  const onIncrementBy = () => incrementBy(5);

  return (
    <div>
      value =<h1 data-testid="counter-value">{counterVal}</h1>
      <Button data-testid="button-increment" onClick={onIncrement}>
        increment
      </Button>
      <Button data-testid="button-decrement" onClick={onDecrement}>
        decrement
      </Button>
      <Button onClick={onIncrementBy}>increment by 5</Button>
    </div>
  );
};
