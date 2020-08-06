import Container from '@material-ui/core/Container';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // useHistory,
} from 'react-router-dom';
import './App.css';
import PageNotFound from './Components/PageNotFound';
import UserProfile from './Components/UserProfile';
import UserSearch from './Components/UserSearch';

export default function App() {
  return (
    <Router>
      <main className="App">
        <div className="App-header">Twitter - User search</div>
        <Container maxWidth="lg" className="container">
          <div className="sub-container">
            <Switch>
              <Route path="/" exact={true} component={UserSearch} />
              <Route path="/user/:userId" component={UserProfile} />
              <Route path="*" component={PageNotFound} />
            </Switch>
          </div>
        </Container>
      </main>
    </Router>
  );
}
