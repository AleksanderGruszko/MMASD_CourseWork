import {CARGO_TYPES} from './cargo.types';

export type Vehicle = {
  uuid: string;
  title: string;
  cargoType: CARGO_TYPES;
  cargoSize: number;
  currentCity: string;
};

export type RawVehicle = Omit<Vehicle, 'uuid'>;
