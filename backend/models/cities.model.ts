import { Schema, model, Document, Model } from 'mongoose';
import {City} from '../../src/types/city.types';

type CitiesInterface = City & Document;

interface CitiesModelInterface extends Model<CitiesInterface> {}

const citiesSchema:Schema<CitiesInterface> = new Schema({
  title: {
    type: 'String',
    required: true,
  },
});

export const citiesModel = model<CitiesInterface, CitiesModelInterface>('cities', citiesSchema);

