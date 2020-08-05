import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setError, setSearchResult } from '../../Redux/actions';
import { PayloadState } from '../../Redux/types';
import UserSearchResult from '../UserSearchResult';
import './style.css';

interface State {
  usersData: PayloadState;
}

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pageCount, setPageCount] = React.useState(1);
  const dispatch = useDispatch();
  const selector = useSelector((state: State) => state.usersData);

  React.useEffect(() => {
    if (selector.isLoading) {
      onSearchUser();
    }
  }, [selector.isLoading]);

  function onSearchUser() {
    if (searchTerm !== '') {
      if (!selector.isLoading) {
        dispatch({
          type: 'RESET_SEARCH_RESULT',
        });
      }
      axios
        .get('/api/users/search', {
          params: {
            search: searchTerm,
            page: selector.isLoading ? pageCount : 1,
          },
        })
        .then((response) => {
          setPageCount(pageCount + 1);

          dispatch(setSearchResult(response.data.response));
        })
        .catch((error) => {
          dispatch(setError(error.response.data.message));
        });
    } else {
      dispatch(setError('Please enter any value. Search term cannot be empty'));
    }
  }

  function storeInput(event) {
    setSearchTerm(event.target.value);
  }

  return (
    <>
      <div className="search-div">
        <input type="text" className="search-input" onChange={storeInput} />
        <Button
          variant="contained"
          className="search-button"
          size="large"
          onClick={onSearchUser}
          startIcon={<SearchIcon />}
        >
          Search
        </Button>
      </div>
      {selector.error ? (
        <div className="error-message">{selector.errorMessage}</div>
      ) : (
        <UserSearchResult />
      )}
    </>
  );
}
