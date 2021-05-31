export enum NOTIFICATION_TYPE {
  ERROR = 'error',
  INFO = 'info',
}

export type NotificationsSliceType = {
  message: {
    text: string;
    type: NOTIFICATION_TYPE;
  } | null;
};
