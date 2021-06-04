import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {ApplicationState, asSliceActions, asSliceSelectors} from '../store.types';
import {OrdersSliceState} from './orders.types';
import {Order} from '../../types/order.types';
import {CARGO_TYPES} from '../../types/cargo.types';

const ORDERS_MOCK: Order[] = [
  {
    uuid: '1',
    cargoType: CARGO_TYPES.BOXES,
    cargoSize: 50,
    sourceCity: '1',
    destinationCity: '2',
  },
  {
    uuid: '2',
    cargoType: CARGO_TYPES.BOXES,
    cargoSize: 50,
    sourceCity: '1',
    destinationCity: '2',
  },
  {
    uuid: '3',
    cargoType: CARGO_TYPES.FLUIDS,
    cargoSize: 50,
    sourceCity: '1',
    destinationCity: '2',
  },
]

const initialState: OrdersSliceState = {
  orders: [],
};

const SLICE_NAME = 'orders';

// example of typed-under-the-hood reducer and simple actions with tools
const rawOrdersSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    setOrders (state, action: PayloadAction<Order[]>) {
      state.orders = action.payload;
    },
    addOrderToList (state, action: PayloadAction<Order>) {
      state.orders.push(action.payload);
    },
    removeOrderFromList (state, action: PayloadAction<Order>) {
      state.orders = state.orders.filter((order) => {
        return order.uuid !== action.payload.uuid;
      });
    },
    editOrderInList (state, action: PayloadAction<Order>) {
      const changedOrder = action.payload;
      state.orders = state.orders.map((order) => {
        if (order.uuid === changedOrder.uuid) {
          return changedOrder;
        }
        return order;
      });
    },
  },
});

const rawActions = rawOrdersSlice.actions;

// example of selectors typings
const selectors = asSliceSelectors({
  getOrders: (state: ApplicationState): Order[] => state.orders.orders,
});

const actions = asSliceActions({
  loadOrders: () => (dispatch) => {
    Promise.resolve().then(() => {
      dispatch(rawActions.setOrders(ORDERS_MOCK));
    });
  },
  addOrder: (order: Order) => (dispatch) => {
    Promise.resolve().then(() => {
      dispatch(rawActions.addOrderToList(order));
    });
  },
  deleteOrder: (order: Order) => (dispatch) => {
    console.log('%c DELETE ORDER', 'color: red');
    Promise.resolve().then(() => {
      dispatch(rawActions.removeOrderFromList(order));
    });
  },
  editOrder: (order: Order) => (dispatch) => {
    Promise.resolve().then(() => {
      dispatch(rawActions.editOrderInList(order));
    });
  },
})

export const ordersSlice = {
  actions: {
    ...rawActions,
    ...actions,
  },
  selectors: selectors,
};

export default rawOrdersSlice.reducer;
