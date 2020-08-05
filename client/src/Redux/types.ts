export interface User {
  name: string;
  profile_image_url_https: string;
  screen_name: string;
}

export interface PayloadState {
  users: User[];
  error: boolean;
  isLoading: boolean;
  loadMore: boolean;
  errorMessage: string;
}

export const SET_SEARCH_RESULT = 'SET_SEARCH_RESULT';
export const SET_ERROR = 'SET_ERROR';
export const SET_LOADING = 'SET_LOADING';
export const RESET_SEARCH_RESULT = 'RESET_SEARCH_RESULT';

interface SetUserAction {
  type: typeof SET_SEARCH_RESULT;
  payload: User[];
}

interface SetErrorAction {
  type: typeof SET_ERROR;
  payload: string;
}

interface SetLoadingAction {
  type: typeof SET_LOADING;
  payload: string;
}

interface ResetSearchResultAction {
  type: typeof RESET_SEARCH_RESULT;
  payload: string;
}

export type SearchActionTypes =
  | SetUserAction
  | SetErrorAction
  | SetLoadingAction
  | ResetSearchResultAction;
