import React, { Fragment } from 'react';
import Navbar from './component/layout/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './component/pages/Home';
import About from './component/pages/About';
import './App.css';
import ContactState from './context/contact/ContactState';
import AlterState from './context/alert/AlertState';
import PrivateRoute from './component/routing/privateRoute'

import AuthState from './context/auth/AuthState';
import Register from "./component/auth/Register";
import Login from "./component/auth/Login";
import Alerts from "./component/layout/Alerts";
import setAuthToken from './utils/setAuthToken';
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  return (
    <AuthState>
      <ContactState>
        <AlterState>
          <Router>
            <Fragment>
              <Navbar />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/register" component={Register} />
                  <Route exact path="/login" component={Login} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlterState>
      </ContactState>
    </AuthState>

  );
}

export default App;
