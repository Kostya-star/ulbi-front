import { AsyncThunkAction } from '@reduxjs/toolkit';
import axios, { AxiosStatic } from 'axios';
import { StateSchema } from '@/app/providers/StoreProvider';

type ActionCreatorType<Return, Arg, RejectedValue> = (arg: Arg) =>
  AsyncThunkAction<Return, Arg, { rejectValue: RejectedValue }>

jest.mock('axios');
const mockedAxios = jest.mocked(axios, true);

export class TestAsyncThunk<Return, Arg, RejectedValue> {
  dispatch: jest.MockedFn<any>;

  api: jest.MockedFunctionDeep<AxiosStatic>;

  getState: () => StateSchema;

  actionCreator: ActionCreatorType<Return, Arg, RejectedValue>;

  constructor(
    actionCreator: ActionCreatorType<Return, Arg, RejectedValue>,
    state?: DeepPartial<StateSchema>,
  ) {
    this.dispatch = jest.fn();
    this.api = mockedAxios;
    this.actionCreator = actionCreator;
    this.getState = jest.fn(() => state as StateSchema);
  }

  async callThunk(arg?: Arg) {
    // @ts-ignore
    const action = this.actionCreator(arg);
    const result = await action(this.dispatch, this.getState, { api: this.api });

    return result;
  }
}
