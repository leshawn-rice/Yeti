import { ADD_USER_COMMENT, ADD_USER_POST, LOGIN_USER, LOGOUT_USER, UPRATE_POST } from '../actionTypes';

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
    case UPRATE_POST:
      const newPosts = state.user.ratings.posts.slice(0);
      for (let post of newPosts) {
        if (post.id === action.payload.rating.post_id) {
          post.rating = action.payload.rating.rating;
        }
      }
      return {
        ...state,
        user: {
          ...state.user,
          ratings: {
            ...state.user.ratings,
            posts: newPosts
          }
        }
      }
    default:
      return state
  };
}

export default userReducer;