import { ActionTypes } from '../../store/action-types';

const initialState = {
  notification: {
    status: '',
    message: '',
    title: '',
  },
  loader: false,
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.BASE_NOTIFICATION_SET: {
      return Object.assign({}, state, {
        notification: {
          status: action.status,
          message: action.message,
          title: action.title,
        },
      });
    }
    case ActionTypes.BASE_NOTIFICATION_CLEAR: {
      return Object.assign({}, state, {
        notification: {
          status: '',
          message: '',
          title: '',
        },
      });
    }
    case ActionTypes.BASE_NOTIFICATION_LOADER: {
      return Object.assign({}, state, {
        loader: action.loader,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
