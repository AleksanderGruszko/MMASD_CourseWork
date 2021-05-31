import { Store, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import {TestSliceState} from './test/test.types';

export type ApplicationState = {
  test: TestSliceState;
};

export type AppStore = Store<ApplicationState>;

export type ThunkActionCreator = ThunkAction<
  void,
  ApplicationState,
  null,
  Action<string>
>;

export type Dispatch = ThunkDispatch<ApplicationState, null, Action>;

export function asSliceSelectors<
  T extends Record<string, (state: ApplicationState) => unknown>
  >(collection: T): T {
  return collection;
}

export function asSliceActions<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  T extends Record<string, (...args: any[]) => ThunkActionCreator>
  >(collection: T): T {
  return collection;
}
