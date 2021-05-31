import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {NOTIFICATION_TYPE, NotificationsSliceType} from './notifications.types';
import { asSliceActions, asSliceSelectors } from '../store.types';

const SLICE_NAME = 'notifications';

const initialState: NotificationsSliceType = {
  message: null,
};

// example of typed-under-the-hood reducer and simple actions with tools
const rawNotificationsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    pushMessage(state, action: PayloadAction<NotificationsSliceType['message']>): void {
      state.message = action.payload;
    },
  },
});

const { pushMessage } = rawNotificationsSlice.actions;

const actions = asSliceActions({
  pushError: (msg: string) => (dispatch) => {
    const message = {
      text: msg,
      type: NOTIFICATION_TYPE.ERROR
    };
    dispatch(pushMessage(message));
  },
  pushInfo: (msg: string) => (dispatch) => {
    const message = {
      text: msg,
      type: NOTIFICATION_TYPE.INFO
    };
    dispatch(pushMessage(message));
  },
});

const selectors = asSliceSelectors({
  message: (state) => state[SLICE_NAME].message,
});

export const notificationsSlice = {
  actions: {
    ...rawNotificationsSlice.actions,
    ...actions,
  },
  selectors,
};

export default rawNotificationsSlice.reducer;
