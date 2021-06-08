import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {createSelector} from 'reselect';
import axios from 'axios';
import { asSliceActions, asSliceSelectors} from '../store.types';
import {CitiesSliceState} from './cities.types';
import {City} from '../../types/city.types';

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
    return axios.get('http://localhost:5000/cities')
      .then((res) => {
        dispatch(rawActions.setCities(res.data));
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
