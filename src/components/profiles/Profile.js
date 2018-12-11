import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class Profile extends Component {

  state = {
    currentUserId: this.props.getCurrentUser(),
  }


  componentDidMount() {
    APIManager.getEntry("users", this.state.currentUserId)
      .then((user) => {
        this.setState({
          userId : user.id,
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
          numberOfWorkouts: workouts.length
        })
      })
  }



  render() {
    return (
      <React.Fragment>
        <div id="profile_container" className="page_container">
          {/* begin contents */}
          <h2>Player Profile</h2>
        {
            <div className="user_card" key={this.state.userId}>
                <img src={this.state.photoURL} className="user_image" alt={this.state.firstName} width="100px"></img>
                <h2>{this.state.firstName} {this.state.lastName}</h2>
                <h2 className="oblique">"{this.state.nickname}"</h2>
                <p>Age: {this.state.age}</p>
                <p>Hometown: {this.state.hometown}</p>
                <p>Height: {this.state.height_ft}&#39;{this.state.height_in}"</p>
                <p>Total Workouts Logged: {this.state.numberOfWorkouts}</p>
            </div>
        }

        </div>
      </React.Fragment>
    )
  }
}