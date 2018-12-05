import React, { Component } from "react"
import NewList from './workouts/NewList'

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>
        <p className="logo_white">this is the ApplicationViews.js file rendering News.js below</p>
        <NewList />
      </React.Fragment>
    )
  }
}