import React, { Component } from "react"
import Login from './Login'
import Register from './Register'

export default class Welcome extends Component {



  render() {
    return (
      <React.Fragment>
        <h1 className="logo center"><span className="text_orange">swish</span><span className="text_white">list</span></h1>
        <p>this is the Welcome.js file rendering Login and Register.js below</p>
        <Login />
        <Register handleFieldChange={this.props.handleFieldChange} />
      </React.Fragment>
    )
  }
}