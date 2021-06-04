import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TestSliceState } from './test.types';
import {asSliceActions, asSliceSelectors } from '../store.types';

const initialState: TestSliceState = {
  counter: 0,
  isLoaded: false,
};

const SLICE_NAME = 'test';

// example of typed-under-the-hood reducer and simple actions with tools
const rawSlice = createSlice({
  name: SLICE_NAME,
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

const rawActions = rawSlice.actions;

// example of selectors typings
const selectors = asSliceSelectors({
  getCounter: (state): number => state[SLICE_NAME].counter,
});

const actions = asSliceActions({
  incrementCounter: () => (dispatch, getState) => {
    const state = getState();
    const counter = selectors.getCounter(state);
    return dispatch(rawActions.setCounter(counter + 1));
  }
});

export const testSlice = {
  name: SLICE_NAME,
  actions: {
    ...rawActions,
    ...actions,
  },
  selectors,
};

export default rawSlice.reducer;
