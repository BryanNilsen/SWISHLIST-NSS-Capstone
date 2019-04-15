import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import './Stats.css'
import '../workouts/Workouts.css'

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

    let usersArray = []
    this.state.shotlogs.map((shotlog) => usersArray.push(shotlog.user_id))


    // create new object to store results in
    let newObj = {};

    // loop through user objects
    this.state.shotlogs.forEach(function (shotlog) {
      // check if user_id  has already been added to newObj
      if (!newObj[shotlog.user_id]) {
        // If it is the first time seeing this user_id
        // we need to add shots attempted and shots made to prevent errors
        newObj[shotlog.user_id] = {};
        newObj[shotlog.user_id]['user_id'] = shotlog.user_id;
        newObj[shotlog.user_id]['shotAttempts'] = 0;
        newObj[shotlog.user_id]['shotsMade'] = 0;
      }
      // add shots attempted and made to newObj for this user
      newObj[shotlog.user_id]['shotAttempts'] += shotlog.shotAttempts
      newObj[shotlog.user_id]['shotsMade'] += shotlog.shotsMade
    })

    const totalsArray = Object.values(newObj)


    return (
      <div id="stats_container" className="page_container">
        {/* begin contents */}
        <h2>Swishlist Leaders</h2>

        <div className="card_container">
          <div className="workout_card">
            <p className="category_title">Total Shots Attempted</p>
            <table className="shotlog_table">
              <tbody className="leaderboard">
                <tr className="shotlog_rowHeader">
                  <td width="40%">Player</td>
                  <td width="20%" style={{ textAlign: "center" }} >Attempts</td>
                </tr>

                {
                  totalsArray.sort((a, b) => parseFloat(b.shotAttempts) - parseFloat(a.shotAttempts))
                    .slice(0, 5)
                    .map((user) => {
                      const userId = user.user_id
                      const shotAttempts = Number(user.shotAttempts)

                      let userFirstName = this.state.users.find(user => userId === user.id).firstName
                      let userLastName = this.state.users.find(user => userId === user.id).lastName
                      let userPhoto = this.state.users.find(user => userId === user.id).photoURL
                      let userDisplayName = `${userFirstName.charAt(0)}${userLastName}`
                      return (
                        <tr key={user.user_id} className="shotlog_hover">
                          <td><img src={userPhoto} alt={userDisplayName} className="user_image_tiny"/>{userDisplayName}</td>
                          <td style={{ textAlign: "center" }}>{shotAttempts} </td>
                        </tr>
                      )
                    })
                }

              </tbody>
            </table>
          </div>
        </div>


        <div className="card_container">
          <div className="workout_card">
            <p  className="category_title">Total Shots Made</p>
            <table className="shotlog_table">
              <tbody className="leaderboard">
                <tr className="shotlog_rowHeader">
                  <td width="40%">Player</td>
                  <td width="20%" style={{ textAlign: "center" }} >Shots Made</td>
                </tr>

                {
                  totalsArray.sort((a, b) => parseFloat(b.shotsMade) - parseFloat(a.shotsMade))
                    .slice(0, 5)
                    .map((user) => {
                      const userId = user.user_id
                      const shotsMade = Number(user.shotsMade)

                      let userFirstName = this.state.users.find(user => userId === user.id).firstName
                      let userLastName = this.state.users.find(user => userId === user.id).lastName
                      let userPhoto = this.state.users.find(user => userId === user.id).photoURL
                      let userDisplayName = `${userFirstName.charAt(0)}${userLastName}`
                      return (
                        <tr key={user.user_id} className="shotlog_hover">
                          <td style={{ padding: "0px 8px"}}><img src={userPhoto} alt={userDisplayName} className="user_image_tiny"/> {userDisplayName}</td>
                          <td style={{ textAlign: "center" }}>{shotsMade} </td>
                        </tr>
                      )
                    })
                }

              </tbody>
            </table>
          </div>
        </div>


        <div className="card_container">
          <div className="workout_card">
            <p className="category_title">Highest Shooting Percentage</p>
            <table className="shotlog_table">
              <tbody className="leaderboard">
                <tr className="shotlog_rowHeader">
                  <td width="40%">Player</td>
                  <td width="20%" style={{ textAlign: "center" }} >Shooting %</td>
                </tr>

                {
                  totalsArray.sort((a, b) => parseFloat(Number(((b.shotsMade / b.shotAttempts) * 100).toFixed(1))) - parseFloat(Number(((a.shotsMade / a.shotAttempts) * 100).toFixed(1))))
                    .slice(0, 5)
                    .map((user) => {
                      const userId = user.user_id
                      const shotsMade = Number(user.shotsMade)
                      const shotAttempts = Number(user.shotAttempts)
                      const shootingPercentage = Number(((shotsMade / shotAttempts) * 100).toFixed(1))

                      let userFirstName = this.state.users.find(user => userId === user.id).firstName
                      let userLastName = this.state.users.find(user => userId === user.id).lastName
                      let userPhoto = this.state.users.find(user => userId === user.id).photoURL
                      let userDisplayName = `${userFirstName.charAt(0)}${userLastName}`
                      return (
                        <tr key={user.user_id} className="shotlog_hover">
                          <td style={{ padding: "0px 8px"}}><img src={userPhoto} alt={userDisplayName} className="user_image_tiny"/> {userDisplayName}</td>
                          <td style={{ textAlign: "center" }}>{shootingPercentage} </td>
                        </tr>
                      )
                    })
                }

              </tbody>
            </table>
          </div>
        </div>

      </div>
    )
  }
}