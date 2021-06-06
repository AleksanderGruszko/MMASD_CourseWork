import React from 'react';
import { TextField, TextFieldProps } from '@material-ui/core';
import styles from './styles.module.scss';

const NativeInputProps = {
  inputProps: {
    max: 100, min: 1, step: 1
  }
}

type CustomInputNumberProps = {
  name: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
}

export function CustomInputNumber ({
  name,
  label,
  value,
  onChange
}: CustomInputNumberProps) {
  const handleChange: TextFieldProps['onChange'] = (e) => {
    onChange(Number(e.target.value));
  }

  return (
    <TextField
      type="number"
      className={styles.root}
      label={label}
      name={name}
      value={value}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={NativeInputProps}
      onChange={handleChange}
      // variant="outlined"
    />
  );
}
