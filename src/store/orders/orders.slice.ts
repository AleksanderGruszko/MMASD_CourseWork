import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import {ApplicationState, asSliceActions, asSliceSelectors} from '../store.types';
import {OrdersSliceState} from './orders.types';
import {Order, RawOrder} from '../../types/order.types';

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
    return axios.get('http://localhost:5000/orders')
      .then((res) => {
        dispatch(rawActions.setOrders(res.data));
      });
  },
  addOrder: (order: RawOrder) => (dispatch) => {
    return axios.post('http://localhost:5000/orders', order).then((res) => {
      dispatch(rawActions.addOrderToList(res.data));
    });
  },
  deleteOrder: (order: Order) => (dispatch) => {
    return axios.delete(`http://localhost:5000/orders/${order.uuid}`)
      .then(() => {
        dispatch(rawActions.removeOrderFromList(order));
      });
  },
  editOrder: (order: Order) => (dispatch) => {
    return axios.put(`http://localhost:5000/orders/${order.uuid}`, order)
      .then((res) => {
        dispatch(rawActions.editOrderInList(res.data));
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
