import { combineReducers } from "redux";
import { AddQuestionReducer } from "./AddQuestion";
import { AllQuestionReducer } from "./AllQuestion";
import userReducer from "./userReducer";
import { viewQuestionReducer } from "./ViewQuestion";
import { yourQuestionReducer } from "./YourQuestion";

const rootReducer = combineReducers({
  user: userReducer,
  yourQuestion: yourQuestionReducer,
  viewQuestion: viewQuestionReducer,
  AllQuestion: AllQuestionReducer,
  AddQuestion: AddQuestionReducer,
});

export default rootReducer;
