import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Box, Grid, TextField} from '@material-ui/core';
import {CustomSelect} from '../../../../components/atoms/CustomSelect';
import {CARGO_TYPES} from '../../../../types/cargo.types';
import {CustomInputNumber} from '../../../../components/atoms/CustomInputNumber';
import {FormHolder} from '../../../../components/organisms/FormHolder';
import {RawVehicle, Vehicle} from '../../../../types/vehicle.types';
import {citiesSlice} from '../../../../store/cities/cities.slice';
import {optionFactories} from '../../../../utils/optionFactories';

type VehicleFormProps = {
  vehicle: Partial<Vehicle | RawVehicle>;
  onSubmit: (order: Vehicle | RawVehicle) => void;
  onCancel: () => void;
};

export default function VehicleForm ({
  vehicle,
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const cities = useSelector(citiesSlice.selectors.getCities);

  const [title, setTitle] = useState(vehicle.title || '');
  const [cargoSize, setCargoSize] = useState(vehicle.cargoSize || 1);
  const [cargoType, setCargoType] = useState(vehicle.cargoType || CARGO_TYPES.BOXES);
  const [currentCity, setCurrentCity] = useState(vehicle.currentCity || '');
  const [errorMsg, setErrorMsg] = useState('');

  const citiesOptions = useMemo(() => {
    return optionFactories.makeCityOptions(cities);
  }, [cities]);

  const cargoOptions = useMemo(() => {
    return optionFactories.makeCargoTypeOptions();
  }, []);

  useEffect(() => {
    setTitle(vehicle.title || '');
    setCargoSize(vehicle.cargoSize || 1);
    setCargoType(vehicle.cargoType || CARGO_TYPES.BOXES);
    setCurrentCity(vehicle.currentCity || '');
    setErrorMsg('');
  }, [vehicle]);

  const handleFormSubmit = () => {
    if (title.length === 0) {
      return setErrorMsg('Vehicle name can\'t be empty');
    }
    if (!currentCity) {
      return setErrorMsg('Current garage should be assigned');
    }
    if (!cargoType) {
      return setErrorMsg('Please, select vehicle\'s cargo type');
    }
    if (!Number.isInteger(cargoSize) || cargoSize <= 0 ) {
      return setErrorMsg('Cargo size should be positive integer');
    }
    setErrorMsg('');
    onSubmit({
      ...vehicle,
      title,
      cargoSize,
      cargoType,
      currentCity,
    });
  };

  return (
    <FormHolder
      onSubmit={handleFormSubmit}
      onCancel={onCancel}
      errorMsg={errorMsg}
    >
      <Grid container spacing={3}>
        <Grid container item lg={6} spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <TextField
                name={'vehicleTitle'}
                label={'Set vehicle name'}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <CustomSelect
                name={'city'}
                items={citiesOptions}
                value={currentCity}
                label={'Assign current garage'}
                onChange={setCurrentCity}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container item lg={6} spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <CustomInputNumber
                name={'cargoSize'}
                label={'Set cargo capacity'}
                value={cargoSize}
                onChange={setCargoSize}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <CustomSelect
                name={'cargoType'}
                items={cargoOptions}
                value={cargoType}
                label={'Select cargo type'}
                onChange={setCargoType}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </FormHolder>
  );
}
