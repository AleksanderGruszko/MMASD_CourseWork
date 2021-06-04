import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ENDPOINTS } from './endpoints.types';
import ExamplePage from './Example';
import {OrdersPage} from './OrdersPage';

export default function PageRoutes () {
  return (
    <BrowserRouter>
      <Switch>
        <Route
          exact={true}
          path={ENDPOINTS.ROOT}
          component={ExamplePage}
        />
        <Route
          exact={true}
          path={ENDPOINTS.ORDERS}
          component={OrdersPage}
        />
      </Switch>
    </BrowserRouter>
  );
}
