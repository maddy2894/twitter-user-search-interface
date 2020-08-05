import {
  RESET_SEARCH_RESULT,
  SearchActionTypes,
  SET_ERROR,
  SET_LOADING,
  SET_SEARCH_RESULT,
  User,
} from './types';

// TypeScript infers that this function is returning setSearchResult
export function setSearchResult(users: User[]): SearchActionTypes {
  return {
    type: SET_SEARCH_RESULT,
    payload: users,
  };
}

// TypeScript infers that this function is returning setError
export function setError(error: string): SearchActionTypes {
  return {
    type: SET_ERROR,
    payload: error,
  };
}

// TypeScript infers that this function is returning setLoading
export function setLoading(): SearchActionTypes {
  return {
    type: SET_LOADING,
    payload: 'Loading',
  };
}

export function resetSearchResults(): SearchActionTypes {
  return {
    type: RESET_SEARCH_RESULT,
    payload: 'reset',
  };
}
