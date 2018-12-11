import React, { Component } from "react"
import { Route, Redirect } from 'react-router-dom'
import NewList from './workouts/NewList'
import ViewList from './workouts/ViewList'
import Motivation from './motivation/Motivation'
import Profile from './profiles/Profile'


export default class ApplicationViews extends Component {

  getCurrentUser = () => {
    const currentUser = +sessionStorage.getItem("userId") || +localStorage.getItem("userId")
    return currentUser
  }

  render() {
    return (
      <React.Fragment>
        <Route exact path="/" render={() => (
          <Redirect to="/newList" />
        )} />
        <Route path="/newList" render={props => {
          return (
            <NewList getCurrentUser={this.getCurrentUser} {...props} />)
        }} />
        <Route path="/viewlists" render={props => {
          return (
            <ViewList getCurrentUser={this.getCurrentUser} {...props}/>)
        }} />
        <Route path="/profile" render={props => {
          return (
            <Profile getCurrentUser={this.getCurrentUser} {...props} />)
        }} />
        <Route path="/motivation" render={props => {
          return (
            <Motivation getCurrentUser={this.getCurrentUser} {...props} />)
        }} />
      </React.Fragment>
    )
  }
}