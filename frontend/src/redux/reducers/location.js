import { SET_LOCATION, CLEAR_LOCATION } from '../actionTypes';

const INITIAL_STATE = {
  location: {}
};

/**
 * 
 * @param {object} state 
 * @param {object} action 
 * 
 * handles the users location in state
 */

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // set location to the given payload
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }
    // set location to an empty object
    case CLEAR_LOCATION:
      return {
        ...state,
        location: {}
      }
    default:
      return state
  };
}

export default locationReducer;