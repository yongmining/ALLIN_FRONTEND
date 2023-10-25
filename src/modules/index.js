import { combineReducers } from 'redux';
import modalsReducer from './modalModule';
import loginReducer from './loginModule';
import memberReducer from './memberModule';
import feedbackReducer from './feedbackModule';
import phraseReducer from './phraseModule';
import youtubeReducer from './youtubeModule';
import musicReducer from './musicModule';
import exerciseReducer from './exerciseModule';
import guestReducer from './guestModule';
import talkReducer from './talkModule';

const rootReducer = combineReducers({
  modalsReducer,
  loginReducer,
  memberReducer,
  guestReducer,
  feedbackReducer,
  phraseReducer,
  talkReducer,
  //pictureReducer,
  youtubeReducer,
  musicReducer,
  exerciseReducer,
});

export default rootReducer;
