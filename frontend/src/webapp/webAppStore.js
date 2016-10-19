import { createStore, combineReducers, applyMiddleware } from 'redux'
import { hashHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import webAppReducer from './reducers'



// Merge reducers
const spreadReducers = combineReducers({
  app: webAppReducer,
  //form: formReducer,
  routing: routerReducer
})

const hashHistoryMiddleware = routerMiddleware(hashHistory)

export default function createAppStore (initialState) {
  return createStore( spreadReducers, initialState, applyMiddleware( thunkMiddleware, hashHistoryMiddleware ) )
};

