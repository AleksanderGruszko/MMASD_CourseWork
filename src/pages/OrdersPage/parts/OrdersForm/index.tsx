import React, {useEffect, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {Box, Grid} from '@material-ui/core';
import {CustomSelect} from '../../../../components/atoms/CustomSelect';
import {CARGO_TYPES} from '../../../../types/cargo.types';
import {CustomInputNumber} from '../../../../components/atoms/CustomInputNumber';
import {FormHolder} from '../../../../components/organisms/FormHolder';
import {Order, RawOrder} from '../../../../types/order.types';
import {citiesSlice} from '../../../../store/cities/cities.slice';

type OrdersFormProps = {
  order: Partial<Order | RawOrder>;
  onSubmit: (order: Order | RawOrder) => void;
  onCancel: () => void;
};

export default function OrdersForm ({
  order,
  onSubmit,
  onCancel,
}: OrdersFormProps) {
  const cities = useSelector(citiesSlice.selectors.getCities);

  const [cargoSize, setCargoSize] = useState(order.cargoSize || 1);
  const [cargoType, setCargoType] = useState(order.cargoType || CARGO_TYPES.BOXES);
  const [sourceCity, setSourceCity] = useState(order.sourceCity || '');
  const [destinationCity, setDestinationCity] = useState(order.destinationCity || '');
  const [errorMsg, setErrorMsg] = useState('');

  const citiesOptions = useMemo(() => {
    return cities.map(({uuid, title}) => ({
      label: title,
      value: uuid,
    }))
  }, [cities]);

  useEffect(() => {
    setCargoSize(order.cargoSize || 1);
    setCargoType(order.cargoType || CARGO_TYPES.BOXES);
    setSourceCity(order.sourceCity || '');
    setDestinationCity(order.destinationCity || '');
  }, [order]);

  const handleFormSubmit = () => {
    if (!Number.isInteger(cargoSize) || cargoSize < 1 ) {
      return setErrorMsg('Cargo size should be positive integer');
    }
    if (!destinationCity || !sourceCity) {
      return setErrorMsg('Please, define origin and destination cities for an order');
    }
    if (destinationCity === sourceCity) {
      return setErrorMsg('Order can be formed only for different cities');
    }
    if (!cargoType) {
      return setErrorMsg('Please, define cargo type');
    }
    onSubmit({
      ...order,
      cargoSize,
      cargoType,
      sourceCity,
      destinationCity,
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
              <CustomInputNumber
                name={'cargoSize'}
                label={'Set cargo amount'}
                value={cargoSize}
                onChange={setCargoSize}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <CustomSelect
                name={'cargoType'}
                items={[
                  { label: 'Boxes', value: CARGO_TYPES.BOXES },
                  { label: 'Barrels', value: CARGO_TYPES.FLUIDS },
                ]}
                value={cargoType}
                label={'Select cargo type'}
                onChange={setCargoType}
              />
            </Box>
          </Grid>
        </Grid>

        <Grid container item lg={6} spacing={3}>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <CustomSelect
                name={'city'}
                items={citiesOptions}
                value={sourceCity}
                label={'Select origin city'}
                onChange={setSourceCity}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <CustomSelect
                name={'city'}
                items={citiesOptions}
                value={destinationCity}
                label={'Select destination city'}
                onChange={setDestinationCity}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </FormHolder>
  );
}
