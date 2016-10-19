import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import createAppStore from './webAppStore'
import initialState from './initialState'


//subComponents
import LoginForm from './components/LoginForm.jsx'


// AppStore
const appStore = createAppStore(initialState);

// Debug state changes
const unsubscribe = appStore.subscribe( () => console.log(appStore.getState()) );

ReactDOM.render(
  <Provider store={appStore}>
    <Router history={browserHistory}>
      <Route path='/' component={LoginForm} />
    </Router>
  </Provider>,
  document.getElementById('webApp')
);
