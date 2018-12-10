import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import Shotlog from './Shotlog'
import "./Workouts.css"

export default class ViewList extends Component {

  state = {
    currentUserId: this.props.getCurrentUser(),
    workouts: [],
  }

  // This updates state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
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

  editWorkout = (id, editedWorkout) => APIManager.editEntry("workouts", id, editedWorkout)
    .then(() => APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`))
    .then(workouts => this.setState({ workouts: workouts }))



  constructEditedWorkout = (id) => {
    const editedWorkout = {
      date: this.state.newWorkoutDate,
      gym: this.state.newWorkoutGym,
      notes: this.state.newWorkoutNotes,
    }
    console.log("edited workout: ", editedWorkout)
    this.editWorkout(id, editedWorkout)
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

                    <div id={workout.id}>
                      <input id="newWorkoutDate" onChange={this.handleFieldChange} type="date" defaultValue={workout.date} />
                      <input id="newWorkoutGym" onChange={this.handleFieldChange} type="text" defaultValue={workout.gym} />
                      <textarea id="newWorkoutNotes" onChange={this.handleFieldChange} defaultValue={workout.notes}></textarea>
                      <button className="btn_edit" onClick={() => this.constructEditedWorkout(workout.id)}>Edit</button>
                    </div>

                    {/* begin swishlists */}

                    <Shotlog workoutId={workout.id} />

                    <div id="workoutEditDelete" className="align_right">
                      <button className="btn_edit">Edit Workout </button>
                      <button className="btn_delete" onClick={() => this.deleteWorkout(workout.id)}>Delete Workout</button>
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
