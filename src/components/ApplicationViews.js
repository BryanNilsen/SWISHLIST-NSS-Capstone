import React, { Component } from "react"
import NewList from './workouts/NewList'
import Motivation from './motivation/Motivation'

export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>
        <p>this is the ApplicationViews.js file rendering NewList.js and Motivation.js below</p>
        <NewList />
        <Motivation />
      </React.Fragment>
    )
  }
}