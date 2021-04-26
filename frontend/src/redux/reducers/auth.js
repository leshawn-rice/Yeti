import { LOGIN_USER, LOGOUT_USER } from '../actionTypes';

const INITIAL_STATE = {
  user: {},
  token: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOGIN_USER:
      if (action.payload) return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
      return {
        ...state,
        user: {},
        token: null
      }
    case LOGOUT_USER:
      return {
        ...state,
        user: {},
        token: null
      }
    default:
      return state
  };
}

export default authReducer;