import React from 'react';
import {Box, Button, Grid} from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/CloseOutlined';

type FormHolderProps = {
  errorMsg?: string;
  onSubmit: (...args: unknown[]) => void;
  onCancel: () => void;
  children: React.ReactNode;
}

export function FormHolder ({
  errorMsg,
  children,
  onSubmit,
  onCancel,
}: FormHolderProps) {

  return (
    <Box mb={2}>
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
          <Box
            display={'flex'}
            flexDirection={{xs: 'row', md: 'column', lg: 'row'}}
          >
            <Box mb={{md: 1}} mr={2}>
              <Button
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                onClick={onSubmit}
              >
                Save
              </Button>
            </Box>
            <Box>
              <Button
                startIcon={<CancelIcon />}
                onClick={onCancel}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
