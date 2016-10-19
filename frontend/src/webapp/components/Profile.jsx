import React from 'react';
import { connect } from 'react-redux'
import { push } from 'react-router-redux'

import * as allActions from '../actions'

const Profile = ( { errorMessage, user , webAppData, updatedAt, userLogout, pushToHomePage} ) => {

  if(!user.token) {
    pushToHomePage()
    return null
  }



  return (

    <div className="container">
        <div className="row">
            <div className="col-xs-12 col-md-6 col-md-offset-3">
                <div className="form-container">
                    <form className="form-signin">
                      <label> {webAppData} </label>
                      <button className="btn btn-lg btn-primary btn-block" onClick={(evt)=> { evt.preventDefault(); userLogout() } }>
                          Logout
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
  webAppData: state.app.dataRequest.data,
  updatedAt: state.app.updatedAt
})

const mapDispatchToProps = (dispatch) => ({
    userLogout: () => {
      dispatch(allActions.userLogout())
    },
    pushToHomePage: () => {
      dispatch(allActions.goToPage('/'))
    }
})

const ProfileContainer = connect(
  mapStateToProps, mapDispatchToProps
)(Profile);


export default ProfileContainer
