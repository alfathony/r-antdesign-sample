import {
  createStore,
  combineReducers,
  applyMiddleware,
} from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';

import base from '../components/base/reducer';

import pageSample from '../components/page-sample/reducer';
import pageSampleForm from '../components/page-sample-form/reducer';

const reducers = combineReducers({
	base,
	pageSample,
	pageSampleForm,
	routing: routerReducer,
});

export const store = createStore(
  reducers,
  // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk),
);

export default store;
