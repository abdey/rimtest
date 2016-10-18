import React from 'react';
import ReactDOM from 'react-dom';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';

//subComponents
import LoginForm from './components/LoginForm.jsx'



ReactDOM.render(
  <Router history={browserHistory}>
    <Route path='/' component={LoginForm} />
  </Router>,
  document.getElementById('webApp')
);
