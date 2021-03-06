import { CircularProgress } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setLoading } from '../../Redux/actions';
import { PayloadState } from '../../Redux/types';
import './style.css';

interface State {
  usersData: PayloadState;
}

export default function UserSearchResult() {
  const selector = useSelector((state: State) => state.usersData);
  const dispatch = useDispatch();

  function loadMoreUsers() {
    dispatch(setLoading());
  }

  return (
    <div className="result-wrapper">
      {selector.users
        ? selector.users.map((user: any, i) => (
            <div key={i}>
              {!user.protected ? (
                <Link to={`/user/${user.id}`} className="link-decoration">
                  <Card className="user-card">
                    <CardHeader
                      className="header-wrapper"
                      avatar={
                        <Avatar>
                          <img
                            src={user.profile_image_url_https}
                            alt="Profile image"
                          />
                        </Avatar>
                      }
                      title={user.name + ' (@' + user.screen_name + ')'}
                    />
                  </Card>
                </Link>
              ) : (
                ''
              )}
            </div>
          ))
        : ''}
      {selector.loadMore ? (
        <Button onClick={loadMoreUsers}>Load More</Button>
      ) : selector.isLoading ? (
        <CircularProgress />
      ) : null}
    </div>
  );
}
