import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import Shotlog from './Shotlog'
import "./Workouts.css"

export default class ViewList extends Component {

  state = {
    currentUserId: this.props.getCurrentUser(),
    workouts: []
  }


  componentDidMount() {
    APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`)
      .then((workouts) => {
        this.setState({ workouts: workouts })
      })
  }

  deleteWorkout = (id) => APIManager.deleteEntry("workouts", id)
    .then(() => APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`))
    .then(workouts => this.setState({ workouts: workouts }))

  editWorkout = (id) => {
    console.log("you clicked edit for id: ", id)
    alert(`you clicked edit for ${id}`)
  }

  render() {
    return (
      <React.Fragment>
        <div id="viewlist_container" className="page_container">
          <h2>View swishlists</h2>
          {
            this.state.workouts.map((workout) => {
              return (
                <div className="card_container" key={workout.id}>
                  <div className="workout_card">
                    <h3 className="card_header">{workout.date}: {workout.gym}</h3>
                    <p>{workout.notes}</p>

                    {/* begin swishlists */}

                    <Shotlog workoutId={workout.id} />

                    <div id="workoutEditDelete">
                      <button onClick={() => this.editWorkout(workout.id)}>Edit Workout </button>
                      <button onClick={() => this.deleteWorkout(workout.id)}>Delete Workout</button>
                    </div>
                  </div>
                </div>
              )
            })
          }
        </div>
      </React.Fragment>
    )
  }
}
