import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class TotalGenerator extends Component {

  state = {
    shotAttempts: [],
    shotsMade: [],
    initialized: false
  }

  componentDidMount() {
    let array = [
    APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`)
      .then((swishlists) => {
        swishlists.map((shots) => {
          // console.log("shot attempts per swishlist:", shots.shotAttempts)
          // console.log("shots made per swishlist:", shots.shotsMade)
          this.state.shotAttempts.push(shots.shotAttempts)
          this.state.shotsMade.push(shots.shotsMade)
          return shots
        }
        )
      })
    ]

    return Promise.all(array)
      .then(() => this.setState({
        initialized: true,
      }))

  }

  getSum = (a, b) => {
    return a + b;
  }



render() {
  if (this.state.initialized === true) {

  const totalShotsAttempted = this.state.shotAttempts.reduce((total, amount) => { return total + amount}, 0)
  const totalShotsMade = this.state.shotsMade.reduce((total, amount) => { return total + amount}, 0)
  const totalPercentage = Number(((totalShotsMade / totalShotsAttempted) * 100).toFixed(1)) || 0


  return (

    <tr className="shotlog_totals" >
      <td width="40%">Totals</td>
      <td width="20%" style={{ textAlign: "center" }}>{totalShotsAttempted}</td>
      <td width="20%" style={{ textAlign: "center" }}>{totalShotsMade}</td>
      <td width="20%" style={{ textAlign: "center" }}>{totalPercentage}</td>
    </tr>
  )
  } else {
    return (
      <tr className="shotlog_totals" >
      <td width="40%">Totals</td>
      <td width="20%" style={{ textAlign: "center" }}>calculating</td>
      <td width="20%" style={{ textAlign: "center" }}>calculating</td>
      <td width="20%" style={{ textAlign: "center" }}>calculating</td>
    </tr>
    )
  }

}



}
