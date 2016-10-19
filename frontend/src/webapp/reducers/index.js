import { FORM_SUBMIT, loginFormSubmit } from '../actions/'
import initialState from '../initialState'

// Main APP Reducers {state,action} => state
export default function webAppReducer(state = initialState, action){

  let newState

  switch(action.type){
    case "LOGIN_FORM_ERROR":
      newState = Object.assign({}, state, { loginRequest : { message : action.message} } )
      return newState
    case "LOGIN_FORM_SUBMIT":
    case "LOGIN_TOKEN_RECEIVED":
      newState = Object.assign({}, state, { updatedAt: action.updatedAt || state.updatedAt, user : { name : action.user.name || state.user.name, token : action.user.token || state.user.token } } )
      return newState
    case "USER_RESET":
      newState = Object.assign({}, state, { updatedAt: action.updatedAt || state.updatedAt, user : { "token" : null, "name" : null, "firstname" : null } } )
      return newState
    case "DATA_RECEIVED":
      newState = Object.assign({}, state, { dataRequest : { data : action.data || state.data } } )
      return newState
    default:
      return state
  }
}
