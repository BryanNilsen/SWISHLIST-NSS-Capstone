import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class Login extends Component {

  state = {
    loginEmail: "",
    loginPassword: "",
    remember: ""
  }

  // Handles input field changes and sets state
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleLogin = (e) => {
    if (this.state.loginEmail === "" || this.state.loginPassword === "") {
      alert("No fields should be left blank")
    }
    else {
      APIManager.getAllEntries("users", `/?email=${this.state.loginEmail}&password=${this.state.loginPassword}`)
        .then(returns => {
          // if theres no user/password match, throw an alert message
          if (returns.length < 1) {
            alert("That email doesn't exist or your password doesn't match. Please try again")

            // if the "remember" checkbox is not selected, log in user to session storage only
          } else if (this.state.remember === "") {
            sessionStorage.setItem( "userId", returns[0].id )
            this.props.setCurrentUserState(returns[0].id)

            // if the "remember" checkbox is selected, log in user to both session and local storage
          } else {
            localStorage.setItem( "userId", returns[0].id )
            sessionStorage.setItem( "userId", returns[0].id )
            this.props.setCurrentUserState( returns[0].id )
          }
        })
    }
  }




  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "hide" : "center basketball_bkg"}>
          <div className="login_form">
            <h2 className="login_form_title">SIGN IN</h2>

            <label className="form_label" htmlFor="loginEmail">Email</label>
            <input className="form_input" onChange={this.handleFieldChange} type="email" id="loginEmail" placeholder="Email address" required="" autoFocus="" />
            <br />
            <label className="form_label" htmlFor="loginPassword">Password</label>
            <input className="form_input" onChange={this.handleFieldChange} type="password" id="loginPassword" placeholder="Password" required="" />
            <br />

            <p className="">
              Remember me
              <input className="" onChange={this.handleFieldChange} type="checkbox" id="remember" />
            </p>
            <div className="center">
              <button className="btn_submit" type="submit" onClick={() => { this.handleLogin() }}>SIGN IN</button>
            </div>
          </div>
          <div className="login_form">
            <div className="center">
              <p>First Time Here?</p>
              <button className="btn_submit" onClick={() => this.props.handleChangeForm()}>REGISTER</button>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}