import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import './Profile.css'

export default class Profile extends Component {

  state = {
    currentUserId: this.props.getCurrentUser(),
    workoutLevel: ""
  }


  componentDidMount() {
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
      })

    APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`)
      .then((workouts) => {
        this.setState({
          numberOfWorkouts: Number(workouts.length)
        });
        this.loggedWorkoutLevel(Number(workouts.length))
      })
  }

  loggedWorkoutLevel = (loggedWorkouts) => {
    console.log(loggedWorkouts)
    if(loggedWorkouts < 10) {
      this.setState({workoutLevel: "rookie"})
    } else if (loggedWorkouts < 20){
      this.setState({workoutLevel: "sophomore"})
    } else {
      this.setState({workoutLevel: "pro"})
    }
  }


  render() {
    return (
      <React.Fragment>
        <div id="profile_container" className="page_container">
          {/* begin contents */}
          <h2>Player Profile</h2>
          {
            <div className="user_card" key={this.state.userId}>
              <div className="flex test_border">
                <div className="user_image_wrapper">
                  <img src={this.state.photoURL} alt={this.state.firstName} className="user_image"></img>
                </div>
                <div className="user_details test_border">
                  <h2>{this.state.firstName} {this.state.lastName}</h2>
                  <h2 className="oblique">"{this.state.nickname}"</h2>
                  <p>Age: {this.state.age}</p>
                  <p>Hometown: {this.state.hometown}</p>
                  <p>Height: {this.state.height_ft}&#39;{this.state.height_in}"</p>
                </div>
              </div>
              <p>Total Workouts Logged: {this.state.numberOfWorkouts} - Level: {this.state.workoutLevel}</p>
            </div>
          }

        </div>
      </React.Fragment>
    )
  }
}