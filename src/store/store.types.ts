import { Store, Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TestSliceState } from './test/test.types';
import { NotificationsSliceType } from './notifications/notifications.types';
import {OrdersSliceState} from './orders/orders.types';
import {CitiesSliceState} from './cities/cities.types';
import {VehiclesSliceState} from './vehicles/vehicles.types';

export type ApplicationState = {
  cities: CitiesSliceState;
  notifications: NotificationsSliceType;
  orders: OrdersSliceState;
  test: TestSliceState;
  vehicles: VehiclesSliceState,
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
