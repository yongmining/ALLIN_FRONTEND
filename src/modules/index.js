import { combineReducers } from "redux";
import modalsReducer from "./modalModule";
import loginReducer from "./loginModule";
import memberReducer from "./memberModule";
import feedbackReducer from "./feedbackModule";
import phraseReducer from "./phraseModule";
import youtubeReducer from "./youtubeModule";
import musicReducer from "./musicModule";
import exerciseReducer from "./exerciseModule";

const rootReducer = combineReducers({
  modalsReducer,
  loginReducer,
  memberReducer,
  feedbackReducer,
  phraseReducer,
  //pictureReducer,
  youtubeReducer,
  musicReducer,
  exerciseReducer,
});

export default rootReducer;
