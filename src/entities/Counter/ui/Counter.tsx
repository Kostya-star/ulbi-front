import { StateSchema } from 'app/providers/StoreProvider';
import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { decrement, increment } from '../model/slice/counterSlice';
import cls from './Counter.module.scss';

interface CounterProps {
  className?: string;
}

export const Counter: FC<CounterProps> = ({ className }) => {
  const counterVal = useSelector((state: StateSchema) => state.counter.value)
  const dispatch = useDispatch();
  const onIncrement = () => dispatch(increment());
  const onDecrement = () => dispatch(decrement());
  return (
    <div className={classNames(cls.Counter, {}, [className])}>
      <h1>
        value =
        {counterVal}
      </h1>

      <Button onClick={onIncrement}>
        increment
      </Button>
      <Button onClick={onDecrement}>
        decrement
      </Button>
    </div>
  );
};
