import { ADD_POST, GET_POSTS, LOAD_POSTS, CLEAR_POSTS } from '../actionTypes';

const INITIAL_STATE = {
  posts: [],
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
    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
        loadedPosts: [],
        unloadedPosts: []
      };
    default:
      return state
  };
}

export default contentReducer;