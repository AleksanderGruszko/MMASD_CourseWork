import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {asSliceActions, asSliceSelectors } from '../store.types';
import {VehiclesSliceState} from './vehicles.types';
import {RawVehicle, Vehicle} from '../../types/vehicle.types';
import axios from 'axios';

const initialState: VehiclesSliceState = {
  vehicles: [],
  isLoaded: false,
};

const SLICE_NAME = 'vehicles';

const rawSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    addVehicleToList(state, action: PayloadAction<Vehicle>) {
      state.vehicles.push(action.payload);
    },
    setVehicles(state, action: PayloadAction<Vehicle[]>) {
      state.vehicles = action.payload;
    },
    editVehicleAtList(state, action: PayloadAction<Vehicle>) {
      const changedVehicle = action.payload;
      state.vehicles = state.vehicles.map((vehicle) => {
        if (vehicle.uuid === changedVehicle.uuid) {
          return changedVehicle;
        }
        return vehicle;
      });
    },
    deleteVehicleFromList(state, action: PayloadAction<Vehicle>) {
      state.vehicles = state.vehicles.filter((vehicle) => (vehicle.uuid !== action.payload.uuid));
    },
    setIsLoaded(state, action: PayloadAction<boolean>): void {
      state.isLoaded = action.payload;
    },
  },
});

const rawActions = rawSlice.actions;

const selectors = asSliceSelectors({
  getVehicles: (state): Vehicle[] => state[SLICE_NAME].vehicles,
  getIsLoaded: (state): boolean => state[SLICE_NAME].isLoaded,
});

const actions = asSliceActions({
  loadVehicles: () => (dispatch) => {
    axios.get('http://localhost:5000/vehicles/')
      .then((res) => {
        dispatch(rawActions.setVehicles(res.data));
        dispatch(rawActions.setIsLoaded(true));
      })
  },

  createVehicle: (vehicle: RawVehicle) => (dispatch) => {
    axios.post('http://localhost:5000/vehicles/', vehicle)
      .then((res) => {
        dispatch(rawActions.addVehicleToList(res.data));
      });
  },

  updateVehicle: (vehicle: Vehicle) => (dispatch) => {
    axios.put(`http://localhost:5000/vehicles/${vehicle.uuid}`, vehicle)
      .then((res) => {
        dispatch(rawActions.editVehicleAtList(res.data));
      });
  },

  deleteVehicle: (vehicle: Vehicle) => (dispatch) => {
    axios.delete(`http://localhost:5000/vehicles/${vehicle.uuid}`)
      .then(() => {
        dispatch(rawActions.deleteVehicleFromList(vehicle));
      });
  },
});

export const vehiclesSlice = {
  name: SLICE_NAME,
  actions: {
    ...rawActions,
    ...actions,
  },
  selectors,
};

export default rawSlice.reducer;
