import React, {useState} from 'react';
import {Grid, Box} from '@material-ui/core';
import {CustomSelect} from '../../components/CustomSelect';
import {CARGO_TYPES} from '../../types/cargo.types';

export default function OrdersForm () {
  const [cargoSize, setCargoSize] = useState(1);
  const [cargoType, setCargoType] = useState(CARGO_TYPES.BOXES);
  const [sourceCity, setSourceCity] = useState(1);
  const [originCity, setOriginCity] = useState(2);

  return (
    <Grid container>
      <Grid container lg={6} spacing={3}>
        <Grid item xs={12} sm={6}>
          Set cargo size
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={2}>
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

      <Grid container lg={6} spacing={3}>
        <Grid item xs={12} sm={6}>
          <Box mb={2}>
            <CustomSelect
              name={'city'}
              items={[
                { label: 'Киев', value: 1 },
                { label: 'Днепр', value: 2 },
              ]}
              value={originCity}
              label={'Select origin city'}
              onChange={setOriginCity}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Box mb={2}>
            <CustomSelect
              name={'city'}
              items={[
                { label: 'Киев', value: 1 },
                { label: 'Днепр', value: 2 },
              ]}
              value={sourceCity}
              label={'Select destination city'}
              onChange={setSourceCity}
            />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
}
