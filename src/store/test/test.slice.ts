import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestSliceState } from './test.types';
import { ApplicationState, ThunkActionCreator } from '../store.types';

const initialState: TestSliceState = {
  counter: 0,
  isLoaded: false,
};

// example of typed-under-the-hood reducer and simple actions with tools
const rawTestSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setCounter(state, action: PayloadAction<number>): void {
      state.counter = action.payload;
    },
    setIsLoaded(state): void {
      state.isLoaded = true;
    },
  },
});

const { actions } = rawTestSlice;

// example of selectors typings
const getCounter = (state: ApplicationState): number => state.test.counter;

const incrementCounter = (): ThunkActionCreator => (dispatch, getState) => {
  const state = getState();
  const counter = getCounter(state);
  return dispatch(actions.setCounter(counter + 1));
};

export const testSlice = {
  actions: {
    ...actions,
    incrementCounter,
  },
  selectors: {
    getCounter,
  },
};

export default rawTestSlice.reducer;
