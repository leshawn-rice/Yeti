import { SHOW_ERRORS, CLEAR_ERRORS } from '../actionTypes';

const INITIAL_STATE = {
  errorThrown: false,
  errors: []
};

const errorReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SHOW_ERRORS:
      return {
        ...state,
        errorThrown: true,
        errors: action.payload
      }
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