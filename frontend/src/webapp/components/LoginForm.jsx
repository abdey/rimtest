import React from 'react';
import { connect } from 'react-redux'

import * as allActions from '../actions'

const LoginForm = ( { errorMessage, user , updatedAt, submitUserForLogin, pushToProfilePage} ) => {

  if(user.token && updatedAt) {
    pushToProfilePage()
  }

  let formUser = { name : null, password : null};


  return (
    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
                <div className="form-container">
                    <form className="form-signin" onSubmit={(evt)=>{ evt.preventDefault(); submitUserForLogin(formUser) } }>
                      <label> Login </label>
                      <label className="error">{errorMessage}</label>
                      <input type="text" className="form-control" placeholder="User Name" onChange={ (evt)=>{ formUser.name = evt.target.value } } />
                      <input type="password" className="form-control" placeholder="Password" onChange={ (evt)=>{ formUser.password = evt.target.value } }/>
                      <button className="btn btn-lg btn-primary btn-block" type="submit">
                          Login
                      </button>
                      <span className="clearfix"></span>
                    </form>
                </div>
            </div>
        </div>
    </div>
  )
}


const mapStateToProps = (state) => ({
  errorMessage : state.app.loginRequest.message,
  user: state.app.user,
  updatedAt: state.app.updatedAt
})

const mapDispatchToProps = (dispatch) => ({
    submitUserForLogin: (user) => {
      if(user.name && user.password)
        dispatch(allActions.loginFormSubmit(user))
      else
        dispatch(allActions.loginError({message : "You need to fill all fields please"}))
    },
    pushToProfilePage: () => {
      dispatch(allActions.goToPage('/profile'))
    }
})

const LoginFormContainer = connect(
  mapStateToProps, mapDispatchToProps
)(LoginForm);


export default LoginFormContainer
