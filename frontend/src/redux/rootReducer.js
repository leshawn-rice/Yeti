import { LOGIN_USER, SHOW_ERRORS } from './actionTypes';

const INITIAL_STATE = {
  location: {},
  user: {},
  isLoading: false,
  errorThrown: false,
  errors: []
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload) return {
        ...state,
        user: action.payload
      }
      return {
        ...state,
        user: {}
      }
    case SHOW_ERRORS:
      return {
        ...state,
        errorThrown: true,
        errors: action.payload
      }
    default:
      return state
  };
}

export default rootReducer;