import { Schema, model, Document, Model } from 'mongoose';
import {Vehicle} from '../../src/types/vehicle.types';

type VehiclesInterface = Vehicle & Document;

interface VehiclesModelInterface extends Model<VehiclesInterface> {}

const vehiclesSchema:Schema<VehiclesInterface> = new Schema({
  title: {
    type: 'String',
    required: true,
  },
  pricePerKm: {
    type: 'Number',
    required: true,
  },
  cargoType: {
    type: 'String',
    required: true,
  },
  cargoSize: {
    type: 'Number',
    required: true,
  },
  currentCity: {
    type: 'String',
    required: true,
  },
});

export const vehiclesModel = model<VehiclesInterface, VehiclesModelInterface>('vehicles', vehiclesSchema);

