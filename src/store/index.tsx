import { configureStore } from './configureStore';
import {CustomWindow} from '../types/window.types';

declare const window: CustomWindow;

const store = configureStore();

if (window) {
  window.__STORE = store;
}

export default store;
