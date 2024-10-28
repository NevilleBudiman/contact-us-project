import { combineReducers } from 'redux';
import contactUsReducer from './reducers/contactUsReducer';

const createRootReducer = () => combineReducers({
  contactUsReducer
});

export default createRootReducer;