import { combineReducers } from 'redux';
import cities from './cities/cities.slice';
import test from './test/test.slice';
import notifications from './notifications/notifications.slice';
import orders from './orders/orders.slice';

export const rootReducer = combineReducers({
  cities,
  orders,
  notifications,
  test,
});

export default rootReducer;
