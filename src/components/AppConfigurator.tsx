import React, {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {citiesSlice} from '../store/cities/cities.slice';

type AppConfiguratorProps = {
  children: React.ReactNode;
}

export function AppConfigurator ({
  children
}: AppConfiguratorProps) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(citiesSlice.actions.loadCities());
  }, []);

  return (<>{children}</>)
}
