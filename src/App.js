import React, { Component } from 'react';
import './App.css';
import Swishlist from './components/Swishlist'
export default class App extends Component {

  state = {
    currentUser: ""
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
        <h1>this app component will maintain current user state and render either:</h1>
        <div>
          <h1>welcome component</h1>
        </div>
        <div>
          <h1>- or -</h1>
        </div>
        <div>
          <h1>swishlist component</h1>
          <Swishlist />
        </div>
      </div>
      </React.Fragment>
    );
  }
}
