import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import './Stats.css'

export default class Stats extends Component {

  state = {
    shotlogs: [],
    users: []
  }


  componentDidMount() {

    const stateToChange = {}

    APIManager.getAllEntries("swishlists")
      .then(shotlogs => {
        stateToChange.shotlogs = shotlogs
        return APIManager.getAllEntries("users")
      })
      .then((users) => {
        stateToChange.users = users
        this.setState(stateToChange)
      })

  }


  render() {
    return (
      <div id="stats_container" className="page_container">
        {/* begin contents */}
        <h2>Stats / Leaderboard</h2>
        <div className="user_card">
          {
            this.state.shotlogs.map((shotlog) => {
              const userId = shotlog.user_id
              const shotLocation =  shotlog.shotLocation
              const shotsMade = Number(shotlog.shotsMade)
              const shotAttempts = Number(shotlog.shotAttempts)
              const shootingPercentage = Number(((shotsMade / shotAttempts) * 100).toFixed(1))
              const tableRowColor = `trc_${Math.floor(((shotsMade / shotAttempts) * 10))}`

              let userFirstName = this.state.users.find(user => userId === user.id).firstName
              let userLastName = this.state.users.find(user => userId === user.id).lastName
              let userDisplayName = `${userFirstName.charAt(0)}${userLastName}`
              return (
                <p key={shotlog.id}>User: {userDisplayName} / Shot Location: {shotLocation} / Att: {shotAttempts} / Made: {shotsMade} / Percent: {shootingPercentage}</p>
              )
            })
          }
        </div>

      </div>
    )
  }
}