import { combineReducers } from 'redux';
import modalsReducer from './modalModule';
import loginReducer from './loginModule';
import memberReducer from './memberModule';
import feedbackReducer from './feedbackModule';
//import pictureReducer from './pictureModule';

const rootReducer = combineReducers({
  modalsReducer,
  loginReducer,
  memberReducer,
  feedbackReducer,
  //pictureReducer,
});

export default rootReducer;
