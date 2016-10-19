import { FORM_SUBMIT, loginFormSubmit } from '../actions/'
import initialState from '../initialState'

// Main APP Reducers {state,action} => state
export default function webAppReducer(state = initialState, action){

  switch(action.type){
    case "LOGIN_FORM_ERROR":
      const newState = Object.assign({}, state, { loginRequest : { message : action.message} } )
      return newState
    default:
      return state
  }
}
