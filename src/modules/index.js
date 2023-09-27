import { combineReducers } from 'redux';
import modalsReducer from './modalModule';

const rootReducer = combineReducers({
  modalsReducer,
});

export default rootReducer;
