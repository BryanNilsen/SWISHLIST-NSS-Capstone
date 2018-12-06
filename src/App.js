import React, { Component } from 'react';
import './App.css';
import Swishlist from './components/Swishlist'
import Welcome from './components/authentication/Welcome'
export default class App extends Component {

  state = {
    currentUser: ""
  }

  // This updates state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  isAuthenticated = () => (sessionStorage.getItem("userId") !== null || localStorage.getItem("userId") !== null)

  getCurrentUser = () => {
    const currentUser = +sessionStorage.getItem("userId") || +localStorage.getItem("userId")
    return currentUser
  }



  render() {
    return (
      <React.Fragment>
        <div>
        <p>this app component will maintain current user state and render either:</p>
        <div>
          <h1>welcome component</h1>
          <Welcome handleFieldChange={this.handleFieldChange}/>
        </div>
        <div>
          <p>- or -</p>
        </div>
        <div>
          <h1>swishlist component</h1>
          <Swishlist handleFieldChange={this.handleFieldChange}/>
        </div>
      </div>
      </React.Fragment>
    );
  }
}
