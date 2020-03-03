import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import "./Shotlog.css"
import TotalGenerator from './TotalGenerator'
export default class Shotlog extends Component {

  state = {
    shotlogs: [],
    shotspots: [],
    totalShots: [],
    locationName: ""
  }


  componentDidMount() {

    const stateToChange = {}

    APIManager.getAllEntries("shotSpots")
      .then(shotspots => {
        stateToChange.shotspots = shotspots
        return APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`)
      })
      .then((shotlogs) => {
        stateToChange.shotlogs = shotlogs
        this.setState(stateToChange)
      })

  }



  render() {
    return (
      <div className="shotlog_container">
        <div className="shotlog_card">
          <table className="shotlog_table">
            <tbody>
              <tr className="shotlog_rowHeader">
                <td width="40%">Shot Location</td>
                <td width="20%" style={{ textAlign: "center" }} >Attempts</td>
                <td width="20%" style={{ textAlign: "center" }} >Made</td>
                <td width="20%" style={{ textAlign: "center" }} >%</td>
              </tr>
              {
                this.state.shotlogs.map((shotlog) => {
                  const shotsMade = Number(shotlog.shotsMade)
                  const shotAttempts = Number(shotlog.shotAttempts)
                  const shootingPercentage = Number(((shotsMade / shotAttempts) * 100).toFixed(1))
                  const tableRowColor = `trc_${Math.floor(((shotsMade / shotAttempts) * 10))}`

                  let locationName = this.state.shotspots.find(shotspot => shotlog.shotLocation === shotspot.id).name


                  return (
                    <tr key={shotlog.id} className={`shotlog_hover ${tableRowColor}`}>
                      <td style={{ textAlign: "left", padding: "0px 8px", fontWeight: "bold" }}>{locationName}</td>
                      <td style={{ textAlign: "center" }}>{shotlog.shotAttempts}</td>
                      <td style={{ textAlign: "center" }} >{shotlog.shotsMade}</td>
                      <td style={{ textAlign: "center" }} >{shootingPercentage}</td>
                    </tr>
                  )
                })
              }
              <TotalGenerator workoutId={this.props.workoutId} />
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
