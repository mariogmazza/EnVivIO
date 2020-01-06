import { combineReducers } from "redux";
import { addFormFieldReducer, isEditingReducer } from "./formFieldReducer";

const rootReducer = combineReducers({
  addFormFieldReducer,
  isEditingReducer
});

export default rootReducer;
