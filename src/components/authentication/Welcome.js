import React, { Component } from "react"
import Login from './Login'
import Register from './Register'
import './Authentication.css'

export default class Welcome extends Component {

  state = {
    hideLoginForm: false,
  }

  handleChangeForm = () => {
    const currentState = this.state.hideLoginForm;
    this.setState({ hideLoginForm: !currentState });
  };

  render() {
    return (
      <React.Fragment>
        <h1 className="logo_large center"><span className="text_orange">swish</span><span className="text_white">list</span></h1>
        <p className="logo_tagline_large center">YOU MISS 100% OF THE SHOTS YOU DON'T TAKE</p>
        <Login handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm} setCurrentUserState={this.props.setCurrentUserState}/>
        <Register handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm}/>
      </React.Fragment>
    )
  }
}