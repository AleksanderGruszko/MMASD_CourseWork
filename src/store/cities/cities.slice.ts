import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { v4 as makeUuid } from 'uuid';
import {ApplicationState, asSliceActions, asSliceSelectors} from '../store.types';
import {CitiesSliceState} from './cities.types';
import {City} from '../../types/city.types';

const CITIES_MOCK = [
  { uuid: makeUuid(), title: 'Kyiv' },
  { uuid: makeUuid(), title: 'Dnipro' },
  { uuid: makeUuid(), title: 'Kharkiv' },
  { uuid: makeUuid(), title: 'Lviv' },
  { uuid: makeUuid(), title: 'Odessa' },
];

const initialState: CitiesSliceState = {
  cities: [],
};

const SLICE_NAME = 'cities';

// example of typed-under-the-hood reducer and simple actions with tools
const rawOrdersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCities (state, action: PayloadAction<City[]>) {
      state.cities = action.payload;
    },
  },
});

const rawActions = rawOrdersSlice.actions;

// example of selectors typings
const selectors = asSliceSelectors({
  getCities: (state: ApplicationState): City[] => state[SLICE_NAME].cities,
});

const actions = asSliceActions({
  loadCities: () => (dispatch) => {
    Promise.resolve().then(() => {
      dispatch(rawActions.setCities(CITIES_MOCK));
    });
  },
})

export const citiesSlice = {
  actions: {
    ...rawActions,
    ...actions,
  },
  selectors: selectors,
};

export default rawOrdersSlice.reducer;
