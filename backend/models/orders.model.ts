import { Schema, model, Document, Model } from 'mongoose';
import {Order} from '../../src/types/order.types';

type OrdersInterface = Order & Document;

interface OrdersModelInterface extends Model<OrdersInterface> {}

const ordersSchema:Schema<OrdersInterface> = new Schema({
  cargoType: {
    type: 'String',
    required: true,
  },
  cargoSize: {
    type: 'Number',
    required: true,
  },
  sourceCity: {
    type: 'String',
    required: true,
  },
  destinationCity: {
    type: 'String',
    required: true,
  },
});

export const ordersModel = model<OrdersInterface, OrdersModelInterface>('orders', ordersSchema);

