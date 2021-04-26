import { combineReducers } from "redux";
import authReducer from "./auth";
import errorReducer from "./errors";
import locationReducer from "./location";
import loadReducer from './load';

/**
 * The root reducer combines all the other reducers (films, planets, people) 
 * into a single reducer using the combineReducers function from the redux library
 */

const rootReducer = combineReducers({
  authReducer,
  errorReducer,
  locationReducer,
  loadReducer
});

export default rootReducer;