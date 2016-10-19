import fetch from 'isomorphic-fetch'
import _ from 'lodash'


/*
 * action types
 */
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'
export const LOGIN_FORM_ERROR = 'LOGIN_FORM_ERROR'
export const LOGIN_TOKEN_RECEIVED = 'LOGIN_TOKEN_RECEIVED'


/*
 * action creators
 */

export function loginFormSubmit (user) {

  return ( dispatch, getState ) => {
    dispatch(userSet(user))
    dispatch(fetchWebAppTokenAuth(user))
  }
}

export function loginError ({ message }) {
  return { type: LOGIN_FORM_ERROR, message, updatedAt: Date.now()}
}

export function loginTokenReceived (user) {
  return { type: LOGIN_TOKEN_RECEIVED, user, updatedAt: Date.now()}
}



function userSet (user) {
  return { type: LOGIN_FORM_SUBMIT, user, updatedAt: Date.now()}
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
