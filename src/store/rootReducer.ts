import { combineReducers } from 'redux';
import test from './test/test.slice';
import notifications from './notifications/notifications.slice';

export const rootReducer = combineReducers({
  notifications,
  test,
});

export default rootReducer;
