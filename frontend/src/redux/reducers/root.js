import { combineReducers } from "redux";
import userReducer from "./user";
import errorReducer from "./errors";
import locationReducer from "./location";
import loadingReducer from './load';
import contentReducer from './content';

/**
 * The root reducer combines all the other reducers (user, error, location, loading, content) 
 * into a single reducer using the combineReducers function from the redux library
 */

const rootReducer = combineReducers({
  userReducer,
  errorReducer,
  locationReducer,
  loadingReducer,
  contentReducer
});

export default rootReducer;