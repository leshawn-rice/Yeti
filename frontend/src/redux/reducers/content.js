import { ADD_POST, GET_POSTS, LOAD_POSTS, CLEAR_POSTS, RATE_POST, ADD_FULL_POST } from '../actionTypes';

const INITIAL_STATE = {
  posts: [],
  currentPost: null,
  loadedPosts: [],
  unloadedPosts: [],
};

const contentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
        loadedPosts: [action.payload, ...state.loadedPosts]
      }
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loadedPosts: action.payload.slice(0, 10),
        unloadedPosts: action.payload.slice(10)
      };
    case LOAD_POSTS:
      if (state.unloadedPosts.length >= 10) {
        return {
          ...state,
          loadedPosts: [...state.loadedPosts, ...state.unloadedPosts.slice(0, 10)],
          unloadedPosts: state.unloadedPosts.slice(10)
        };
      }
      else if (state.unloadedPosts.length > 0) {
        return {
          ...state,
          loadedPosts: [...state.loadedPosts, ...state.unloadedPosts.slice(0, state.unloadedPosts.length)],
          unloadedPosts: state.unloadedPosts.slice(state.unloadedPosts.length)
        };
      }
      else {
        return state
      }
    case RATE_POST:
      const posts = state.posts.slice(0);
      const unloadedPosts = state.unloadedPosts.slice(0);
      const loadedPosts = state.loadedPosts.slice(0);
      let current = null;
      if (state.currentPost && state.currentPost.id === action.payload.post.id) {
        current = { ...state.currentPost, rating: action.payload.post.rating }
      }
      for (let post of posts) {
        if (post.id === action.payload.post.id) {
          post.rating = action.payload.post.rating;
        }
      }
      for (let post of unloadedPosts) {
        if (post.id === action.payload.post.id) {
          post.rating = action.payload.post.rating;
        }
      }
      for (let post of loadedPosts) {
        if (post.id === action.payload.post.id) {
          post.rating = action.payload.post.rating;
        }
      }
      return {
        ...state,
        posts: posts,
        unloadedPosts: unloadedPosts,
        loadedPosts: loadedPosts,
        currentPost: current
      }
    case ADD_FULL_POST:
      return {
        ...state,
        currentPost: action.payload
      }
    case CLEAR_POSTS:
      return {
        ...state,
        currentPost: null,
        posts: [],
        loadedPosts: [],
        unloadedPosts: []
      };
    default:
      return state
  };
}

export default contentReducer;