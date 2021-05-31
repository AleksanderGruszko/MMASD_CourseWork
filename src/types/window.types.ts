import { compose } from 'redux';
import {AppStore} from '../store/store.types';

export type CustomWindow = Window & {
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  __STORE?: AppStore;
};
