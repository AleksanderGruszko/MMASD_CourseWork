import {Vehicle} from '../../types/vehicle.types';

export type VehiclesSliceState = {
  vehicles: Vehicle[];
  isLoaded: boolean;
};
