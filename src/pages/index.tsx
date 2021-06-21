import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ENDPOINTS } from './endpoints.types';
import ExamplePage from './Example';
import {OrdersListPage} from './OrdersListPage';
import {VehiclesListPage} from './VehiclesListPage';
import {CitiesListPage} from './CitiesListPage';
import {InvoicesListPage} from './InvoicesListPage';

export default function PageRoutes () {
  return (
    <Switch>
      <Route
        exact={true}
        path={ENDPOINTS.ROOT}
        component={ExamplePage}
      />
      <Route
        exact={true}
        path={ENDPOINTS.ORDERS}
        component={OrdersListPage}
      />
      <Route
        exact={true}
        path={ENDPOINTS.VEHICLES}
        component={VehiclesListPage}
      />
      <Route
        exact={true}
        path={ENDPOINTS.CITIES}
        component={CitiesListPage}
      />
      <Route
        exact={true}
        path={ENDPOINTS.INVOICES}
        component={InvoicesListPage}
      />
    </Switch>
  );
}
