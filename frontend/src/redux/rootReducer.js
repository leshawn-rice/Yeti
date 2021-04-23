const INITIAL_STATE = {
  location: {},
  user: {},
  isLoading: false,
  errorThrown: false,
  errors: []
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    default:
      return state
  };
}

export default rootReducer;