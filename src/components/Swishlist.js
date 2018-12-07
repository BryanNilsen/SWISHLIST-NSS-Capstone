import React, { Component } from "react"
import Navbar from './nav/Navbar';
import ApplicationViews from './ApplicationViews'

export default class Swishlist extends Component {


  render() {
    return (
      <React.Fragment>
        <Navbar />
        <ApplicationViews />
      </React.Fragment>
    )
  }
}