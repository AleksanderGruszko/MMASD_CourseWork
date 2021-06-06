import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useSnackbar } from 'notistack';
import { notificationsSlice } from '../../../store/notifications/notifications.slice';

export function ConnectedNotifications () {
  const message = useSelector(notificationsSlice.selectors.message);
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (message === null) {
      return;
    }
    const {text, type} = message;
    enqueueSnackbar(text, {
      variant: type,
    });
  }, [message, enqueueSnackbar]);

  return null;
}
