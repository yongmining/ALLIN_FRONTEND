import { combineReducers } from 'redux';
import modalsReducer from './modalModule';
import loginReducer from './loginModule';
import memberReducer from './memberModule';
import feedbackReducer from './feedbackModule';

const rootReducer = combineReducers({
  modalsReducer,
  loginReducer,
  memberReducer,
  feedbackReducer,
});

export default rootReducer;
