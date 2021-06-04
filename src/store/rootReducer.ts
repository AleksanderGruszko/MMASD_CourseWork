import { combineReducers } from 'redux';
import test from './test/test.slice';
import notifications from './notifications/notifications.slice';
import orders from './orders/orders.slice';

export const rootReducer = combineReducers({
  orders,
  notifications,
  test,
});

export default rootReducer;
