import { PayloadAction } from '@reduxjs/toolkit';

import { buildSlice } from '@/shared/lib/store/buildSlice';

import { CounterSchema } from '../types/counterSchema';

const initialState: CounterSchema = {
  value: 0,
};

export const counterSlice = buildSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    incrementBy: (state, { payload }: PayloadAction<number>) => {
      state.value += payload;
    },
    decrement: (state) => {
      state.value -= 1;
    },
  },
});

// export const { increment, decrement, incrementBy } = counterSlice.actions;

export const {
  reducer: counterReducer,
  actions,
  useActions: useCounterActions,
} = counterSlice;
