import React, { Component } from "react"
import { Route, Redirect } from 'react-router-dom'
import NewList from './workouts/NewList'
import ViewList from './workouts/ViewList'
import Motivation from './motivation/Motivation'
import Profile from './profiles/Profile'


export default class ApplicationViews extends Component {

  render() {
    return (
      <React.Fragment>
        <p>this is the ApplicationViews.js file rendering NewList.js and Motivation.js below</p>
        <Route path="/newlist" render={props => {
          return (
            <NewList {...props} />)
        }} />
        <Route path="/viewlists" render={props => {
          return (
            <ViewList {...props} />)
        }} />
        <Route path="/profile" render={props => {
          return (
            <Profile {...props} />)
        }} />
        <Route path="/motivation" render={props => {
          return (
            <Motivation {...props} />)
        }} />
      </React.Fragment>
    )
  }
}