import { SET_LOCATION, CLEAR_LOCATION } from '../actionTypes';

const INITIAL_STATE = {
  location: {}
};

const locationReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOCATION:
      return {
        ...state,
        location: action.payload
      }
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