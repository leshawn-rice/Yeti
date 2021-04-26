import { START_LOADING, STOP_LOADING } from '../actionTypes';

const INITIAL_STATE = {
  isLoading: false
};

const loadReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case START_LOADING:
      return {
        ...state,
        isLoading: true
      }
    case STOP_LOADING:
      return {
        ...state,
        isLoading: false
      }
    default:
      return state
  };
}

export default loadReducer;