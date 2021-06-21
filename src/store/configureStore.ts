import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { rootReducer } from './rootReducer';
import {
  AppStore,
} from './store.types';
import {CustomWindow} from '../types/window.types';

declare const global: CustomWindow;

export const composeEnhancers = global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? global.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose;

export const configureStore = (): AppStore => {
  const store = createStore(
    rootReducer,
    {},
    composeEnhancers(applyMiddleware(thunk)),
  );

  return store;
};
