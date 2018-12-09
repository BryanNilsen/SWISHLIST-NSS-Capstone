import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import "./Shotlog.css"

export default class Shotlog extends Component {

  state = {
    shotlogs: []
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
              <tr>
                <td>Shot Location</td>
                <td>Shots Attempted</td>
                <td>Shots Made</td>
                <td>Percentage</td>
              </tr>
              {
                this.state.shotlogs.map((shotlog) => {
                  const shotsMade = Number(shotlog.shotsMade)
                  const shotAttempts = Number(shotlog.shotAttempts)
                  const shootingPercentage = Number(((shotsMade / shotAttempts) * 100).toFixed(2))
                  const tableRowColor = `trc_${Math.floor(((shotsMade / shotAttempts) * 10))}`


                  return (
                    <tr key={shotlog.id} className={tableRowColor}>
                      <td>{shotlog.shotLocation}</td>
                      <td>{shotlog.shotAttempts}</td>
                      <td>{shotlog.shotsMade}</td>
                      <td>{shootingPercentage}</td>
                    </tr>
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
