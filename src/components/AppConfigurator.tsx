import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {citiesSlice} from '../store/cities/cities.slice';

type AppConfiguratorProps = {
  children: React.ReactNode;
}

export function AppConfigurator ({
  children
}: AppConfiguratorProps) {
  const dispatch = useDispatch();
  const areCitiesLoaded = useSelector(citiesSlice.selectors.isLoaded);

  useEffect(() => {
    dispatch(citiesSlice.actions.loadCities());
  }, []);

  if (!areCitiesLoaded) {
    return null;
  }

  return (<>{children}</>)
}
