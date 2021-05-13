import {
  REFRESH,
  ADD_USER_COMMENT,
  ADD_USER_POST,
  LOGIN_USER,
  LOGOUT_USER,
  RATE_COMMENT,
  RATE_POST,
  UPDATE_USER,
  SAVE_COMMENT,
  SAVE_POST,
  UNSAVE_COMMENT,
  UNSAVE_POST
} from '../actionTypes';

const INITIAL_STATE = {
  user: {},
  token: null,
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case REFRESH:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
      }
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
    case UPDATE_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token
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
    case SAVE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          saved: {
            ...state.user.saved,
            posts: [
              ...state.user.saved.posts,
              action.payload
            ]
          }
        }
      }
    case UNSAVE_POST:
      const newSavedPosts = state.user.saved.posts.filter(post => post.post_id !== action.payload).filter(Boolean);
      return {
        ...state,
        user: {
          ...state.user,
          saved: {
            ...state.user.saved,
            posts: newSavedPosts
          }
        }
      }
    case SAVE_COMMENT:
      return {
        ...state,
        user: {
          ...state.user,
          saved: {
            ...state.user.saved,
            comments: [
              ...state.user.saved.comments,
              action.payload
            ]
          }
        }
      }
    case UNSAVE_COMMENT:
      const newSavedComments = state.user.saved.comments.filter(comment => comment.comment_id !== action.payload).filter(Boolean);
      return {
        ...state,
        user: {
          ...state.user,
          saved: {
            ...state.user.saved,
            comments: newSavedComments
          }
        }
      }
    case RATE_POST:
      const posts = state.user.ratings.posts.slice(0);
      // Adjust post if it exists in current ratings
      let pushedPost = false;
      for (let i = 0; i < posts.length; i++) {
        let post = posts[i];
        if (post.post_id === action.payload.rating.post_id) {
          if (action.payload.rating.rating === 0) {
            posts.splice(i, 1);
            pushedPost = true;
          }
          else {
            post.rating = action.payload.rating.rating;
            pushedPost = true;
          }
        }
      }
      // Adjust users posts
      for (let post of state.user.posts) {
        if (post.id === action.payload.rating.post_id) {
          post.rating = action.payload.rating.rating;
        }
      }
      if (!pushedPost && action.payload.rating.rating !== 0) {
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

    case RATE_COMMENT:
      const comments = state.user.ratings.comments.slice(0);
      // Adjust comment if it exists in current ratings
      let pushedComment = false;
      for (let i = 0; i < comments.length; i++) {
        let comment = comments[i];
        if (comment.comment_id === action.payload.rating.comment_id) {
          if (action.payload.rating.rating === 0) {
            comments.splice(i, 1);
            pushedComment = true;
          }
          else {
            comment.rating = action.payload.rating.rating;
            pushedComment = true;
          }
        }
      }
      // Adjust users comments
      for (let comment of state.user.comments) {
        if (comment.id === action.payload.rating.comment_id) {
          comment.rating = action.payload.rating.rating;
        }
      }
      if (!pushedComment && action.payload.rating.rating !== 0) {
        comments.push(action.payload.rating);
      }
      return {
        ...state,
        user: {
          ...state.user,
          ratings: {
            ...state.user.ratings,
            comments: comments
          }
        }
      }
    default:
      return state
  };
}

export default userReducer;