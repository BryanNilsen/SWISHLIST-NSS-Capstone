import React, { Component } from "react"
import Navbar from './nav/Navbar';
import ApplicationViews from './ApplicationViews'

export default class Swishlist extends Component {


  render() {
    return (
      <React.Fragment>
      <div className="background_container">
      <div className="app_container">
        <Navbar />
        <ApplicationViews handleFieldChange={this.props.handleFieldChange}/>
      </div>
      </div>
      </React.Fragment>
    )
  }
}