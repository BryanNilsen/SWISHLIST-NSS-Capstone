import React, { Component } from "react"
import Login from './Login'
import Register from './Register'
import './Authentication.css'
import APIManager from '../../modules/APIManager'

export default class Welcome extends Component {

  state = {
    hideLoginForm: false,
    shotAttempts: []
  }


  componentDidMount() {

    APIManager.getAllEntries("swishlists", `?_sort=user_id&_order=desc`)
      .then((shotlogs) => {
        const shotAttemptsArray = []
        shotlogs.map(shotlog => {
          const shotAttempts = shotlog.shotsMade
          shotAttemptsArray.push(shotAttempts)
          return shotlog
        })
        return  this.setState({ shotAttempts: shotAttemptsArray })
      })

  }

  handleChangeForm = () => {
    const currentState = this.state.hideLoginForm;
    this.setState({ hideLoginForm: !currentState });
  };

  render() {
    const totalShots = this.state.shotAttempts.reduce((a, b) => +a + +b, 0).toLocaleString()
    console.log("shot attempts from state", totalShots)
    return (
      <React.Fragment>
        <h1 className="logo_large center"><span className="text_orange">swish</span><span className="text_white">list</span></h1>
        <p className="logo_tagline_large center">YOU MISS 100% OF THE SHOTS YOU DON'T TAKE</p>
        <p className="shot_counter">Total Swishes Listed: <span className="counter_glow">{totalShots}</span></p>
        <Login handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm} setCurrentUserState={this.props.setCurrentUserState}/>
        <Register handleChangeForm={this.handleChangeForm} hideLoginForm={this.state.hideLoginForm}/>
      </React.Fragment>
    )
  }
}