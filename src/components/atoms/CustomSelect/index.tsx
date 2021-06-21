import React from 'react';
import {FormControl, InputLabel, Select, SelectProps, MenuItem} from '@material-ui/core';
import styles from './styles.module.scss';

type CustomSelectProps<T> = {
  name: string;
  items: {label: string; value: T}[];
  value?: T;
  label: string;
  onChange: (value: T) => void;
};

export function CustomSelect<T extends string | number> ({
  name,
  items = [],
  value = '' as T,
  label,
  onChange,
}: CustomSelectProps<T>) {
  const handleChange: SelectProps['onChange'] = (e) => {
    onChange(e.target.value as T);
  };

  return (
    <div className={styles.wrapper}>
      <FormControl
        className={styles.root}
      >
        <InputLabel id={`${name}_label`}>{label}</InputLabel>
        <Select
          labelId={`${name}_label`}
          value={value}
          onChange={handleChange}
        >
          <MenuItem value={''}>{label}</MenuItem>
          {items.map(({label, value}) => (
            <MenuItem key={value} value={value}>{label}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
