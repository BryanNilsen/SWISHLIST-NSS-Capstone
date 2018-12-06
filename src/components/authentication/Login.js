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
      APIManager.getAllEntries("users", `/?email=${this.state.loginEmail}&password=${this.state.loginPassword
        }`)
        .then(returns => {

          if (returns.length < 1) {
            alert("That email doesn't exist or your password doesn't match. Please try again")
          } else if (this.state.remember === "") {
            sessionStorage.setItem(
              "userId", returns[0].id
            )
            this.setState({
              currentUser: sessionStorage.getItem("userId")
            }, console.log("current user1:", this.state.currentUser))
            // this.props.history.push("/")

          } else {
            localStorage.setItem(
              "userId", returns[0].id
            )
            this.setState({
              currentUser: localStorage.getItem("userId")
            }, console.log("current user2:", this.state.currentUser))
            // this.props.history.push("/")
          }
        })
    }
  }




  render() {
    return (
      <React.Fragment>
        <div className={this.props.hideLoginForm ? "hide" : "center basketball_bkg"}>
        <p>spacer text</p>
          <div className="login_form">
            <h2>SIGN IN</h2>

            <label className="" htmlFor="loginEmail">Email</label>
            <input className="" onChange={this.handleFieldChange} type="email" id="loginEmail" placeholder="Email address" required="" autoFocus="" />
            <br />
            <label className="" htmlFor="loginPassword">Password</label>
            <input className="" onChange={this.handleFieldChange} type="password" id="loginPassword" placeholder="Password" required="" />
            <br />

            <p className="">
              Remember me
              <input className="" onChange={this.handleFieldChange} type="checkbox" id="remember" />
            </p>

            <button className="" type="submit" onClick={() => {this.handleLogin()}}>Sign in</button>
          </div>
          <div className="">
            <p>First Time Here?</p>
            <button onClick={() => this.props.handleChangeForm()}>REGISTER</button>
          </div>
        </div>
      </React.Fragment>
    )
  }
}