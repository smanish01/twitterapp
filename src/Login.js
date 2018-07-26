import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class Login extends Component {

  render() {
    return (
      <div id='middlePageDesign'>
      <a href='http://localhost:3001/auth/twitter' >
          Sign In with Twitter
      </a>
      </div>
    );
  }
}

export default Login;
