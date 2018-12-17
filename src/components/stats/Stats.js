import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import './Stats.css'

export default class Stats extends Component {

  state = {
    shotlogs: []
  }


  componentDidMount() {

    APIManager.getAllEntries("swishlists", `?_sort=user_id&_order=desc`)
      .then((shotlogs) => {
        this.setState({ shotlogs: shotlogs })
      })

      APIManager.getAllEntries("users")
      .then((users) => {
        this.setState({ users: users })
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
              return (
                <p key={shotlog.id}>User: {userId} / Shot Location: {shotLocation} / Att: {shotAttempts} / Made: {shotsMade} / Percent: {shootingPercentage}</p>
              )
            })
          }
        </div>

      </div>
    )
  }
}