import React, {Component} from 'react';
import logo from './main.svg';
import './App.css';
import background from './space-background2.mp4'
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";
import BackgroundVideo from 'react-background-video-player'
import { Provider } from "react-redux";
import store from "./store";

import Landing from "./components/Landing";
import Register from "./components/Auth/Register";
import Login from "./components/Auth/Login";
import PrivateRoute from "./components/private-route/PrivateRoute";
import Hub from "./components/Hub";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
// Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div className="App">
                        <video autoPlay loop muted>
                                <source src={background} type='video/mp4' />
                                <source src={background} type="video/ogg" />
                        </video>
                      <Route exact path="/" component={Landing} />
                      <Route exact path="/register" component={Register} />
                      <Route exact path="/login" component={Login} />
                      <Switch>
                        <PrivateRoute exact path="/hub" component={Hub} />
                      </Switch>
                    </div>
                </Router>
            </Provider>
        );
    }
}

export default App;
