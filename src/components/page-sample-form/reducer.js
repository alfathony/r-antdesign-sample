import { ActionTypes } from '../../store/action-types';

const initialState = {
  detail: {},
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionTypes.SAMPLE_DATA_DETAIL: {
      return Object.assign({}, state, {
        detail: action.data,
      });
    }
    default: {
      return state;
    }
  }
};

export default reducer;
