import { combineReducers, compose, createStore } from 'redux';

const reducers = {
  usersSearch: (
    oldState = {
      users: [],
      error: false,
      isLoading: false,
    },
    action
  ) => {
    const { type } = action;
    switch (type) {
      case 'SET_SEARCH_RESULT':
        return {
          ...oldState,
          users: oldState.users.concat(action.payload),
          error: false,
          loadMore: action.payload.length === 10,
          isLoading: false,
        };
      case 'SET_ERROR':
        return {
          ...oldState,
          error: true,
          loadMore: false,
          errorMessage: action.payload,
          isLoading: false,
        };
      case 'SET_LOAD_MORE':
        return {
          ...oldState,
          error: false,
          loadMore: false,
          isLoading: true,
        };
      case 'RESET_SEARCH_RESULT':
        return {
          ...oldState,
          users: [],
          error: false,
          loadMore: false,
          isLoading: false,
        };
      default:
        return oldState;
    }
  },
};

const slices = combineReducers({ ...reducers });

const composeEnhancers = compose;

const store = createStore(slices, composeEnhancers());

export default store;
