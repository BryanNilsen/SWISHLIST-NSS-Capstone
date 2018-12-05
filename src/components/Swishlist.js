import React, { Component } from "react"
import Navbar from './nav/Navbar';
import ApplicationViews from './ApplicationViews'

export default class Swishlist extends Component {


  render() {
    return (
      <React.Fragment>
          <p>this is the Swishlist.js file rendering Navbar.js and News.js below</p>
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}