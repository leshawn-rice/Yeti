import { GET_POSTS } from '../actionTypes';

const INITIAL_STATE = {
  posts: [],
  loadedPosts: [],
  unloadedPosts: [],
};

const addToLoaded = (loaded, unloaded) => {
  // shift 10 out of unloaded
  // push 10 to loaded
}

const contentReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_POSTS:
      // const newPosts = addToLoaded(state.loadedPosts, state.unloadedPosts);
      return {
        ...state,
        posts: action.payload,
        loadedPosts: action.payload.slice(0, 10),
        unloadedPosts: action.payload.slice(10)
      };
    default:
      return state
  };
}

export default contentReducer;