import {City} from '../types/city.types';

export function getDistance (city: City, city2: City) {
  return city.distances[city2.uuid];
}
