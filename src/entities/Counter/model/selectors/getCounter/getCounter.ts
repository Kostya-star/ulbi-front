import { buildSelector } from '@/shared/lib/store/buildSelector';

import { CounterSchema } from '../../types/counterSchema';

export const [useCounter, getCounter] = buildSelector<CounterSchema>(
  (state) => state.counter,
);
