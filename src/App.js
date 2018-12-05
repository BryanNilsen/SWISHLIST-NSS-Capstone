import React, { Component } from 'react';
import './App.css';

class App extends Component {

  state = {
    currentUser: ""
  }

  render() {
    return (
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
        </div>
      </div>

    );
  }
}

export default App;
