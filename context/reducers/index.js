import { combineReducers } from "redux";
import userAuthReducers from "./userAuthReducers";
const myReducer = combineReducers({
user:userAuthReducers
});

export default myReducer;