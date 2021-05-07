import { ADD_USER_COMMENT, ADD_USER_POST, LOGIN_USER, LOGOUT_USER, RATE_POST } from '../actionTypes';

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
    case RATE_POST:
      const posts = state.user.ratings.posts.slice(0);
      // Adjust post if it exists in current ratings
      console.log(action.payload);
      for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        if (post.post_id === action.payload.rating.post_id) {
          if (action.payload.rating.rating === 0) {
            posts.splice(i, 1);
          }
          else {
            post.rating = action.payload.rating.rating;
          }
        }
      }
      // If ratings is empty, put the rating in if it isn't null
      if (posts.length === 0 && action.payload.rating.rating !== 0) {
        posts.push(action.payload.rating);
      }
      return {
        ...state,
        user: {
          ...state.user,
          ratings: {
            ...state.user.ratings,
            posts: posts
          }
        }
      }
    default:
      return state
  };
}

export default userReducer;