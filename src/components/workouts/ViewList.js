import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import Shotlog from './Shotlog'
import "./Workouts.css"

export default class ViewList extends Component {

  state = {
    currentUserId: this.props.getCurrentUser(),
    workouts: [],
    shownForm: null,
  }

  // This updates state whenever an input field is edited
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  toggleEditForm = (id) => {
    if (this.state.shownForm === null) {
      this.setState({
        shownForm: id,
      });
    } else {
      this.setState({
        shownForm: null,
      });
    }
  }


  componentDidMount() {
    APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`)
      .then((workouts) => {
        this.setState({ workouts: workouts })
      })
  }

  deleteWorkout = (id) => APIManager.deleteEntry("workouts", id)
    .then(this.deleteWorkoutSwishlists(id))
    .then(() => APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`))
    .then(workouts => this.setState({ workouts: workouts }))

  editWorkout = (id, editedWorkout) => APIManager.editEntry("workouts", id, editedWorkout)
    .then(() => APIManager.getAllEntries("workouts", `?user_id=${this.state.currentUserId}`))
    .then(workouts => this.setState({ workouts: workouts }))



  deleteWorkoutSwishlists = (workoutId) => {
    APIManager.getAllEntries("swishlists", `?workout_id=${workoutId}`)
      .then((results) =>
      results.forEach((result) => APIManager.deleteEntry("swishlists", result.id))
        )
  }



  constructEditedWorkout = (id) => {
    const editedWorkout = {
      date: this.state.newWorkoutDate,
      gym: this.state.newWorkoutGym,
      notes: this.state.newWorkoutNotes,
    }
    this.editWorkout(id, editedWorkout)
    this.toggleEditForm()
  }

  render() {

    return (
      <div id="viewlist_container" className="page_container">
        <h2>View swishlists</h2>
        {
          this.state.workouts.map((workout) => {
            return (
              <div className="card_container" key={workout.id}>
                <div className="workout_card">
                  {/* begin page content */}
                  <div id={workout.id} className={`${this.state.shownForm === workout.id ? 'hide' : "workout_card"}`}>
                    <h3 className="card_header">{workout.date}: {workout.gym}</h3>
                    <p>{workout.notes}</p>
                  </div>
                  {/* edit form hidden to start */}
                  <div id={workout.id} className={`${this.state.shownForm === workout.id ? "edit_form" : 'hide'}`}>
                    <table style={{ width: "100%" }}>
                      <tbody>
                        <tr>
                          <td>
                            <label htmlFor="newWorkoutDate">Date: </label></td>
                          <td>
                            <input id="newWorkoutDate" onChange={this.handleFieldChange} type="date" defaultValue={workout.date} className="edit_form_input" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="newWorkoutGym">Gym: </label></td>
                          <td>
                            <input id="newWorkoutGym" onChange={this.handleFieldChange} type="text" defaultValue={workout.gym} className="edit_form_input" />
                          </td>
                        </tr>
                        <tr>
                          <td>
                            <label htmlFor="newWorkoutNotes">Notes:</label></td>
                          <td>
                            <input type="text" id="newWorkoutNotes" onChange={this.handleFieldChange} defaultValue={workout.notes} className="edit_form_input" style={{ width: "100%" }} />
                          </td>
                        </tr>
                      </tbody>
                    </table>
                    <button className="btn_edit" onClick={() => this.constructEditedWorkout(workout.id)}>Save Edits</button>
                  </div>

                  {/* begin swishlists */}

                  <Shotlog workoutId={workout.id} />

                  <div id="workoutEditDelete" className="align_right">
                    <button className="btn_edit" onClick={() => this.toggleEditForm(workout.id)}>Edit Workout </button>
                    <button className="btn_delete" onClick={() => this.deleteWorkout(workout.id)}>Delete Workout</button>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }
}
