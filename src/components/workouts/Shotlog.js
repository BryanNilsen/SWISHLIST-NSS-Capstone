import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import "./Shotlog.css"
import TotalGenerator from './TotalGenerator'
export default class Shotlog extends Component {

  state = {
    shotlogs: [],
    totalShots: []
  }


  componentDidMount() {
    APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`)
      .then((shotlogs) => {
        this.setState({ shotlogs: shotlogs })
      })
  }

  // deleteWorkout = (id) => APIManager.deleteEntry("workouts", id)
  //   .then(() => APIManager.getAllEntries("workouts", `?userId=${this.state.currentUserId}`))
  //   .then(workouts => this.setState({ workouts: workouts }))

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

                  return (
                    <tr key={shotlog.id} className={`shotlog_hover ${tableRowColor}`}>
                      <td style={{ textAlign: "left", padding: "0px 8px", fontWeight: "bold" }}>{shotlog.shotLocation}</td>
                      <td style={{ textAlign: "center" }}>{shotlog.shotAttempts}</td>
                      <td style={{ textAlign: "center" }} >{shotlog.shotsMade}</td>
                      <td style={{ textAlign: "center" }} >{shootingPercentage}</td>
                    </tr>
                  )
                })
              }
              <TotalGenerator workoutId={this.props.workoutId}/>
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
