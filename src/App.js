import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Login from './Login';
import Twitter from './Twitter';

class App extends Component {
  render() {
    return (
      <Router basename='/'>
        <Switch>
          <Route exact path='/' render={(props) => <Login {...props} />} />
          <Route exact path='/twitter' render={(props) => <Twitter {...props} />} />

        </Switch>
      </Router >
    );
  }
}

export default App;
