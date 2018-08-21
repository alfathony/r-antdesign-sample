import { ActionTypes } from '../../store/action-types';

const initialState = {
  data: [],
  meta: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAMPLE_DATA_LIST: {
      return Object.assign({}, state, {
        data: action.data,
        meta: action.meta,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
