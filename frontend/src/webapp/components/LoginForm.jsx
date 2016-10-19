import React from 'react';
import ReactDOM from 'react-dom';

export default class LoginForm extends React.Component {
  render() {
    return (
      <div className="container">
          <div className="row">
              <div className="col-xs-12 col-md-6 col-md-offset-3">
                  <div className="form-container">
                      <form className="form-signin">
                        <label> Login </label>
                        <input type="text" className="form-control" placeholder="Email" />
                        <input type="password" className="form-control" placeholder="Password" />
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
}
