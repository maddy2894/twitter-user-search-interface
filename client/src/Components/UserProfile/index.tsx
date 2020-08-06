import { CircularProgress } from '@material-ui/core';
import axios from 'axios';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tweet } from 'react-twitter-widgets';
import { resetSearchResults, setError } from '../../Redux/actions';
import { PayloadState } from '../../Redux/types';
import './style.css';

interface State {
  usersData: PayloadState;
}

export default function UserProfile({ match }) {
  const selector = useSelector((state: State) => state.usersData);
  const [searchedUser, setSearchedUser] = React.useState({
    followers_count: '',
    name: '',
    profile_image_url_https: '',
    screen_name: '',
    tweets: [{ id_str: '' }],
  });

  const dispatch = useDispatch();

  React.useEffect(() => {
    axios
      .get('/api/user/profile', {
        params: {
          userId: match.params.userId,
        },
      })
      .then((response) => {
        setSearchedUser(response.data.response);
      })
      .catch((error) => {
        dispatch(setError(error.response.data.message));
      });

    // Reset search results when navigating from user profile
    return () => {
      dispatch(resetSearchResults());
    };
    // Trigger only one time
  }, []);

  return (
    <div className="profile-wrapper">
      {selector.error ? (
        <div className="error-message">{selector.errorMessage}</div>
      ) : searchedUser.name !== '' ? (
        <div>
          <img
            src={searchedUser.profile_image_url_https.replace('_normal', '')}
            className="user-avatar"
          />
          <div>
            <h1>{searchedUser.name}</h1>
            <h2>@{searchedUser.screen_name}</h2>
            <h3>{searchedUser.followers_count} followers</h3>
          </div>
          <div className="tweet-container">
            {searchedUser.tweets.map((tweet, i) => (
              <div key={i} className="tweet-wrapper">
                <Tweet tweetId={tweet.id_str} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>
          <CircularProgress />
        </div>
      )}
    </div>
  );
}
