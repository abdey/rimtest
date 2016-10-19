import { push } from 'react-router-redux'
import fetch from 'isomorphic-fetch'
import _ from 'lodash'


/*
 * action types
 */
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'
export const LOGIN_FORM_ERROR = 'LOGIN_FORM_ERROR'
export const LOGIN_TOKEN_RECEIVED = 'LOGIN_TOKEN_RECEIVED'
export const USER_RESET = 'USER_RESET'
export const DATA_RECEIVED = 'DATA_RECEIVED'


/*
 * action creators
 */
export function goToPage(idPage) {
  return ( dispatch, getState ) => {
    if(idPage==='/profile')
      dispatch(fetchWebAppData())
   dispatch(push(idPage))
 }
}

export function loginFormSubmit (user) {

  return ( dispatch, getState ) => {
    dispatch(userSet(user))
    dispatch(fetchWebAppTokenAuth(user))
  }
}

export function userLogout () {
  return ( dispatch, getState ) => {
    dispatch(fetchWebAppLogout())
  }
}

export function loginError ({ message }) {
  return { type: LOGIN_FORM_ERROR, message, updatedAt: Date.now()}
}

export function loginTokenReceived (user) {
  return { type: LOGIN_TOKEN_RECEIVED, user, updatedAt: Date.now()}
}

export function dataReceived (data) {
  return { type: DATA_RECEIVED, data, updatedAt: Date.now()}
}


function userSet (user) {
  return { type: LOGIN_FORM_SUBMIT, user, updatedAt: Date.now()}
}
function userReset () {
  return { type: USER_RESET, updatedAt: Date.now()}
}

function fetchWebAppTokenAuth ( user ) {

  return ( dispatch, getState ) => {

    return fetch('/py/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user : user.name,
        password : user.password
      })
    })
      .then( (response) => {
        response.json().then( (json) => {
          user.token = json.token
          dispatch(loginTokenReceived(user))
        })
      })

  }

}

function fetchWebAppLogout () {

  return ( dispatch, getState ) => {

    const logoutURL = '/py/logout?token=' + getState().app.user.token

    return fetch(logoutURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then( (response) => {
        response.json().then( (json) => {
          if(json.msg==='disconnect success')
            dispatch(userReset())
        })
      })

  }

}

function fetchWebAppData () {

  return ( dispatch, getState ) => {

    const dataURL = '/py/data?token=' + getState().app.user.token

    return fetch(dataURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then( (response) => {
        response.json().then( (json) => {
          dispatch(dataReceived(json.data))

        })
      })

  }

}


