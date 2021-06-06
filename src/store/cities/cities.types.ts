import {City} from '../../types/city.types';

export type CitiesSliceState = {
  isLoaded: boolean;
  cities: City[];
};
