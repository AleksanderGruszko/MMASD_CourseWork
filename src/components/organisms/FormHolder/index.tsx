import React from 'react';
import {Box, Button, Grid} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';

type FormHolderProps = {
  errorMsg?: string;
  onSubmit: (...args: unknown[]) => void;
  children: React.ReactNode;
}

export function FormHolder ({
  errorMsg,
  children,
  onSubmit,
}: FormHolderProps) {

  return (
    <Grid container spacing={3}>
      <Grid container item md={10} spacing={3}>
        <Box flexGrow={1} p={2}>
          <Box mb={!!errorMsg ? 2 : 0}>
            {children}
          </Box>
          {errorMsg && (
            <Box
              mb={{sm: 0, md: 2}}
              fontSize={12}
              color={'error.main'}
            >
              {errorMsg}
            </Box>
          )}
        </Box>
      </Grid>
      <Grid item md={2}>
        <Box mb={3}>
          <Button
            variant="contained"
            size="large"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={onSubmit}
          >
            Save
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}
