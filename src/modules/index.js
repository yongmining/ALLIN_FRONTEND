import { combineReducers } from "redux";
import modalsReducer from "./modalModule";
import loginReducer from "./loginModule";
import memberReducer from "./memberModule";
import feedbackReducer from "./feedbackModule";
import phraseReducer from "./phraseModule";
import youtubeReducer from "./youtubeModule";

const rootReducer = combineReducers({
  modalsReducer,
  loginReducer,
  memberReducer,
  feedbackReducer,
  phraseReducer,
  //pictureReducer,
  youtubeReducer,
});

export default rootReducer;
