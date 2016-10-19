/*
 * action types
 */
export const LOGIN_FORM_SUBMIT = 'LOGIN_FORM_SUBMIT'


/*
 * action creators
 */

export function loginFormSubmit (user) {
  return { type: LOGIN_FORM_SUBMIT, updatedAt: Date.now()}
}

