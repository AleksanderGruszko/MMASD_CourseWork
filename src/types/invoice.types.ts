import {Order} from './order.types';

export type CargoChunk = {
  orderUuid: string;
  vehicleUuid: string;
  cargoSize: number;
}

export type Invoice = {
  uuid: string;
  order: Order;
  cargoChunks: CargoChunk[];
  totalPrice: number;
};

export type DeclinedOrder = {
  orderUuid: string;
  reasonOfDecline: string;
};
