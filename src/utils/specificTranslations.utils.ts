import {CARGO_TYPES} from '../types/cargo.types';

export function getCargoTypeTranslation (type: CARGO_TYPES) {
  switch (type) {
    case CARGO_TYPES.FLUIDS:
      return 'Fluids';
    case CARGO_TYPES.BOXES:
      return 'Boxes';
    default:
      throw new Error(`Required translation for unknown cargo type ${type}`);
  }
}

export function getCargoTypeMeasureUnitsTranslation (type: CARGO_TYPES) {
  switch (type) {
    case CARGO_TYPES.FLUIDS:
      return 'barrels';
    case CARGO_TYPES.BOXES:
      return 'boxes';
    default:
      throw new Error(`Required translation for unknown cargo type ${type}`);
  }
}
