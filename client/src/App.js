import React, { Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar/Navbar';
import Home from './components/pages/Home';
import Alert from './components/layout/Alert/Alert';
import About from './components/pages/About';
import Journal from './components/pages/Journal';
import Week from './components/pages/Week';
import Month from './components/pages/Month';
import Quarter from './components/pages/Quarter';
import Year from './components/pages/Year';
import Profile from './components/pages/Profile';
import Login from './components/pages/Login';
import Register from './components/pages/Register';
import PrivateRoute from './components/routing/PrivateRoute';

import DossierState from './context/dossier/DossierState';
import AuthState from './context/auth/AuthState';

import setAuthToken from './utils/setAuthToken';

//set token on headers once for all
setAuthToken(localStorage.getItem('token'));

const App = () => {
  return (
    <AuthState>
      <DossierState>
        <Router>
          <Fragment>
            <Navbar />
            <Alert />
            <Switch>
              <PrivateRoute exact path='/' component={Home} />
              <PrivateRoute exatc path='/journal' component={Journal} />
              <PrivateRoute exatc path='/week' component={Week} />
              <PrivateRoute exatc path='/month' component={Month} />
              <PrivateRoute exact path='/quarter' component={Quarter} />
              <PrivateRoute exact path='/year' component={Year} />
              <PrivateRoute exact path='/profile' component={Profile} />
              <Route exact path='/about' component={About} />
              <Route exact path='/login' component={Login} />
              <Route exact path='/register' component={Register} />
            </Switch>
          </Fragment>
        </Router>
      </DossierState>
    </AuthState>
  );
};

export default App;
