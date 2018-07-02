import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import AppReducer from '../reducers/index';

const store = createStore(AppReducer, undefined, applyMiddleware(thunk));
export default store;
