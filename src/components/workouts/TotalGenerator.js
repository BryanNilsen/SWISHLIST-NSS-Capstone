import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class TotalGenerator extends Component {

  state = {
    shotAttempts: [],
    shotsMade: []
  }

  componentDidMount() {
    APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`)
      .then((swishlists) => {
        swishlists.map((shots) => {
          console.log("shot attempts per swishlist:", shots.shotAttempts)
          console.log("shots made per swishlist:", shots.shotsMade)
          this.state.shotAttempts.push(shots.shotAttempts)
          this.state.shotsMade.push(shots.shotsMade)
        }
        )
      })

  }

  getSum = (a, b) => {
    return a + b;
  }



render() {

  const totalShotsAttempted = this.state.shotAttempts.reduce((total, amount) => { return total + amount}, 0)
  const totalShotsMade = this.state.shotsMade.reduce((total, amount) => { return total + amount}, 0)
  const totalPercentage = Number(((totalShotsMade / totalShotsAttempted) * 100).toFixed(1))


  return (

    <tr className="shotlog_totals" >
      <td width="40%">Totals</td>
      <td width="20%" style={{ textAlign: "center" }}>{totalShotsAttempted}</td>
      <td width="20%" style={{ textAlign: "center" }}>{totalShotsMade}</td>
      <td width="20%" style={{ textAlign: "center" }}>{totalPercentage}</td>
    </tr>
  )


}



}
