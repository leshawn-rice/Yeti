import { ADD_USER_COMMENT, ADD_USER_POST, LOGIN_USER, LOGOUT_USER } from '../actionTypes';

const INITIAL_STATE = {
  user: {},
  token: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
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
    case ADD_USER_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: [
            ...state.user.posts,
            action.payload
          ]
        }
      }
    case ADD_USER_COMMENT:
      return {
        ...state,
        user: {
          ...state.user,
          comments: [
            ...state.user.comments,
            action.payload
          ]
        }
      }
    default:
      return state
  };
}

export default userReducer;