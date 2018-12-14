import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import './Profile.css'

export default class Profile extends Component {

  state = {
    currentUserId: this.props.getCurrentUser(),
    workoutLevel: "",
    totalShotAttemptsArray: [],
    totalShotsMadeArray: [],
    initialized: false,
  }


  componentDidMount() {
    let array = [
      APIManager.getEntry("users", this.state.currentUserId)
        .then((user) => {
          this.setState({
            userId: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            nickname: user.nickname,
            photoURL: user.photoURL,
            age: user.age,
            hometown: user.hometown,
            height_ft: user.height_ft,
            height_in: user.height_in,
          })
        }),

      APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`)
        .then((workouts) => {
          this.setState({
            allWorkouts: workouts,
            numberOfWorkouts: Number(workouts.length)
          });
          this.loggedWorkoutLevel(Number(workouts.length))
        }),

      APIManager.getAllEntries("swishlists", `?user_id=${this.state.currentUserId}`)
        .then((swishlists) => {
          this.setState({
            allSwishlists: swishlists,
            numberOfSwishlists: Number(swishlists.length)
          })
          swishlists.map((shots) => {
            this.state.totalShotAttemptsArray.push(shots.shotAttempts)
            this.state.totalShotsMadeArray.push(shots.shotsMade)
            return shots
          })

        })
    ]

    return Promise.all(array)
      .then(() => this.setState({
        initialized: true,
      }))
  }



  loggedWorkoutLevel = (loggedWorkouts) => {
    // console.log(loggedWorkouts)
    if (loggedWorkouts < 10) {
      this.setState({ workoutLevel: "ROOKIE" })
    } else if (loggedWorkouts < 20) {
      this.setState({ workoutLevel: "SOPHOMORE" })
    } else if (loggedWorkouts < 50) {
      this.setState({ workoutLevel: "PRO" })
    } else if (loggedWorkouts < 100) {
      this.setState({ workoutLevel: "VETERAN" })
    } else {
      this.setState({ workoutLevel: "ALL-STAR" })
    }
  }


  render() {

    if (this.state.initialized === true) {


      const totalShotsAttempted = this.state.totalShotAttemptsArray.reduce((total, amount) => { return total + amount }, 0)
      const totalShotsMade = this.state.totalShotsMadeArray.reduce((total, amount) => { return total + amount }, 0)
      const totalPercentage = Number(((totalShotsMade / totalShotsAttempted) * 100).toFixed(1)) || 0

      return (
        <React.Fragment>
          <div id="profile_container" className="page_container">
            {/* begin contents */}
            <h2>Player Profile</h2>
            {
              <div className="user_card" key={this.state.userId}>
                <div className="flex">
                  <div className="user_image_wrapper">
                    <img src={this.state.photoURL} alt={this.state.firstName} className="user_image"></img>
                  </div>
                  <div className="user_details">
                    <h1 className="profile_name_header">{this.state.firstName} {this.state.lastName}</h1>
                    <p className="oblique">aka: "{this.state.nickname}"</p>
                    <p>Age: {this.state.age}</p>
                    <p>Hometown: {this.state.hometown}</p>
                    <p>Height: {this.state.height_ft}&#39;{this.state.height_in}"</p>
                  </div>
                </div>

                <p>Total Workouts Logged: {this.state.numberOfWorkouts} - Level: <span className={`${this.state.workoutLevel} user_level`}>{this.state.workoutLevel}</span></p>
                <h3>Shooting Totals</h3>
                <div className="total_card_container">
                  <div className="total_card">
                    <h1 className="total_card_digits">{totalShotsAttempted}</h1>
                    <p className="total_card_text">Shot<br/>Attempts</p>
                  </div>
                  <div className="total_card">
                    <h1 className="total_card_digits">{totalShotsMade}</h1>
                    <p className="total_card_text">Shots<br/>Made</p>
                  </div>
                  <div className="total_card">
                    <h1 className="total_card_digits">{totalPercentage}%</h1>
                    <p className="total_card_text">Shooting<br/>Percentage</p>
                  </div>
                </div>
              </div>
            }

          </div>
        </React.Fragment>
      )
    } else {
      return (
        <div><p>calculating</p></div>
      )
    }
  }

}