import React, {useState} from 'react';
import {Grid, Box } from '@material-ui/core';
import {CustomSelect} from '../../../../components/atoms/CustomSelect';
import {CARGO_TYPES} from '../../../../types/cargo.types';
import {CustomInputNumber} from '../../../../components/atoms/CustomInputNumber';
import {FormHolder} from '../../../../components/organisms/FormHolder';

export default function OrdersForm () {
  const [cargoSize, setCargoSize] = useState(1);
  const [cargoType, setCargoType] = useState(CARGO_TYPES.BOXES);
  const [originCity, setOriginCity] = useState('');
  const [targetCity, setTargetCity] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleFormSubmit = () => {
    if (!Number.isInteger(cargoSize) || cargoSize < 1 ) {
      return setErrorMsg('Cargo size should be positive integer');
    }
    if (!targetCity || !originCity) {
      return setErrorMsg('Please, define origin and destination cities for an order');
    }
    if (targetCity === originCity) {
      return setErrorMsg('Order can be formed only for different cities');
    }
    if (!cargoType) {
      return setErrorMsg('Please, define cargo type');
    }
  };

  return (
    <FormHolder
      onSubmit={handleFormSubmit}
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
                items={[
                  { label: 'Киев', value: '1' },
                  { label: 'Днепр', value: '2' },
                ]}
                value={originCity}
                label={'Select origin city'}
                onChange={setOriginCity}
              />
            </Box>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Box mb={{sm: 2, md: 0}}>
              <CustomSelect
                name={'city'}
                items={[
                  { label: 'Киев', value: '1' },
                  { label: 'Днепр', value: '2' },
                ]}
                value={targetCity}
                label={'Select destination city'}
                onChange={setTargetCity}
              />
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </FormHolder>
  );
}
