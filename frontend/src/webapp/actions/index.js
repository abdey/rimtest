/*
 * action types
 */
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'
export const LOGIN_FORM_ERROR = 'LOGIN_FORM_ERROR'


/*
 * action creators
 */

export function loginFormSubmit (user) {
  return { type: LOGIN_FORM_SUBMIT, user, updatedAt: Date.now()}
}
export function loginError ({ message }) {

  return { type: LOGIN_FORM_ERROR, message, updatedAt: Date.now()}
}

