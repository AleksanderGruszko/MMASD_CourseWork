import { combineReducers } from 'redux';
import cities from './cities/cities.slice';
import notifications from './notifications/notifications.slice';
import orders from './orders/orders.slice';
import test from './test/test.slice';
import vehicles from './vehicles/vehicles.slice';

export const rootReducer = combineReducers({
  cities,
  notifications,
  orders,
  test,
  vehicles,
});

export default rootReducer;
