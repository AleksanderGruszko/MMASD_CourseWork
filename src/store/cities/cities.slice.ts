import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import { v4 as makeUuid } from 'uuid';
import { asSliceActions, asSliceSelectors} from '../store.types';
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
  isLoaded: false,
};

const SLICE_NAME = 'cities';

// example of typed-under-the-hood reducer and simple actions with tools
const rawOrdersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setCities (state, action: PayloadAction<City[]>) {
      state.cities = action.payload;
      state.isLoaded = true;
    },
  },
});

const rawActions = rawOrdersSlice.actions;

// example of selectors typings
const selectors = asSliceSelectors({
  getCities: (state): City[] => state[SLICE_NAME].cities,
  isLoaded: (state): boolean => state[SLICE_NAME].isLoaded,
});

const getCitiesHash = createSelector([
  selectors.getCities,
], (cities) => {
  return cities.reduce((acc, city) => {
    acc[city.uuid] = city;
    return acc;
  }, {} as Record<string, City>);
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
  selectors: {
    ...selectors,
    getCitiesHash,
  },
};

export default rawOrdersSlice.reducer;
