import {CARGO_TYPES} from './cargo.types';

export type Order = {
  uuid: string;
  cargoType: CARGO_TYPES;
  cargoSize: number;
  sourceCity: string;
  destinationCity: string;
};

export type RawOrder = Omit<Order, 'uuid'>;
