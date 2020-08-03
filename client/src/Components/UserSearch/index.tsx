import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserSearchResult from '../UserSearchResult';
import './style.css';

export default function UserSearch() {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [pageCount, setPageCount] = React.useState(1);
  const dispatch = useDispatch();
  const selector = useSelector((state: any) => state.usersSearch);

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
            page: pageCount,
            search: searchTerm,
          },
        })
        .then((response) => {
          setPageCount(pageCount + 1);
          dispatch({
            payload: response.data.response,
            type: 'SET_SEARCH_RESULT',
          });
        })
        .catch((error) => {
          dispatch({
            type: 'SET_ERROR',
            payload: error.response.data.message,
          });
        });
    } else {
      dispatch({
        type: 'SET_ERROR',
        payload: 'Please enter any value. Search term cannot be empty',
      });
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
