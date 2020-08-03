import Container from '@material-ui/core/Container';
import * as React from 'react';
import {
  BrowserRouter as Router,
  Route,
  // useHistory,
} from 'react-router-dom';
import './App.css';
import UserProfile from './Components/UserProfile';
import UserSearch from './Components/UserSearch';

export default function App() {
  return (
    <Router>
      <main className="App">
        <div className="App-header">Twitter - User search</div>
        <Container maxWidth="lg" className="container">
          <div className="sub-container">
            <Route path="/" exact={true} component={UserSearch} />
            <Route path="/user/:userId" component={UserProfile} />
          </div>
        </Container>
      </main>
    </Router>
  );
}
