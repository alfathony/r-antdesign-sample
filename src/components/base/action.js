import { ActionTypes } from '../../store/action-types';

export const setLoader = val => ({
  type: ActionTypes.BASE_NOTIFICATION_LOADER,
  loader: val,
});

export const setNotification = (status, message, title) => ({
  type: ActionTypes.BASE_NOTIFICATION_SET,
  status,
  message,
  title,
});

export const clearNotification = () => ({
  type: ActionTypes.BASE_NOTIFICATION_CLEAR,
});

export default {
  setNotification,
  clearNotification,
  setLoader,
};
