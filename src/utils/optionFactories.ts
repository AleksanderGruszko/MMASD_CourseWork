import {City} from '../types/city.types';
import {CARGO_TYPES} from '../types/cargo.types';
import {getCargoTypeTranslation} from './specificTranslations.utils';

type OptionsMeta = {
  empty?: {
    label: string;
    value: unknown;
  }
}

function addEmpty <OptionType>(options: OptionType[], opts?: OptionsMeta) {
  if (!opts || !opts.empty) {
    return options;
  }
  return [opts.empty, ...options];
}

type Option = {label: string;};

type CargoTypeOption = Option & {value: CARGO_TYPES};

export const optionFactories = {
  makeCityOptions (cities: City[]) {
    return cities.map(({uuid, title}) => ({
      label: title,
      value: uuid,
    }));
  },

  makeCargoTypeOptions (opts?: OptionsMeta) {
    return [
      {label: getCargoTypeTranslation(CARGO_TYPES.BOXES), value: CARGO_TYPES.BOXES},
      {label: getCargoTypeTranslation(CARGO_TYPES.FLUIDS), value: CARGO_TYPES.FLUIDS},
    ];
  }
}
