import { combineReducers } from 'redux';
import test from './test/test.slice';

export const rootReducer = combineReducers({
  test,
});

export default rootReducer;
