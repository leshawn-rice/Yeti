import { START_LOADING, STOP_LOADING } from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false
};

/**
 * 
 * @param {object} state 
 * @param {object} action 
 * 
 * handles loading in state
 */

const loadingReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    // set isLoading to true
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      }
    // set isLoading to false
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  };
}

export default loadingReducer;