import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class Login extends Component {



  render() {
    return (
      <React.Fragment>
        <div className="">
          <h2>SIGN IN</h2>

          <label className="" htmlFor="inputEmail">Email</label>
          <input className="" onChange="" type="email" id="loginEmail" placeholder="Email address" required="" autoFocus="" />
          <br />
          <label className="" htmlFor="inputPassword">Password</label>
          <input className="" onChange="" type="password" id="loginPassword" placeholder="Password" required="" />
          <br />

          <p className="">
            Remember me
            <input className="" onChange="" type="checkbox" id="remember" />
          </p>

          <button className="" type="submit" onClick="">Sign in</button>
        </div>
        <div className="">
          <p>First Time Here?</p>
          <button>REGISTER</button>
        </div>
      </React.Fragment>
    )
  }
}