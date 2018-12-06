import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom'
import './App.css';
import Swishlist from './components/Swishlist'
import Welcome from './components/authentication/Welcome'
export default class App extends Component {

  state = {
    currentUser: sessionStorage.getItem("userId")
  }

  // This updates state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  isLoggedIn = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  getCurrentUser = () => {
    const currentUser = +sessionStorage.getItem("userId") || +localStorage.getItem("userId")
    return currentUser
  }


  isAuthenticated = () => {
    if(this.isLoggedIn()) {
      return (
        <Swishlist handleFieldChange={this.handleFieldChange}/>
      )
    } else {
      return (
        <Welcome handleFieldChange={this.handleFieldChange}/>
      )
    }
  }

  render() {
    return (
      this.isAuthenticated()
    )
  }
}


