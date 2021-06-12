import { SHOW_ERRORS, CLEAR_ERRORS } from '../actionTypes';

const INITIAL_STATE = {
  errorThrown: false,
  errors: []
};

/**
 * 
 * @param {object} state 
 * @param {object} action 
 * 
 * handles errors in state
 */

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // Switch errorThrown to true and set errors to the payload
    case SHOW_ERRORS:
      return {
        ...state,
        errorThrown: true,
        errors: action.payload
      }
    // Switch errorThrown to false and set errors to an empty array
    case CLEAR_ERRORS:
      return {
        ...state,
        errorThrown: false,
        errors: []
      }
    default:
      return state
  };
}

export default errorReducer;