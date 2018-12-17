import React, { Component } from 'react'
import './ShotMap.css'
import ShotMap from './ShotMap';
import './Workouts.css';
import APIManager from '../../modules/APIManager'

export default class NewList extends Component {

  state = {
    newDate: "",
    newGym: "",
    newNotes: "",
    currentUserId: this.props.getCurrentUser(),
    workoutId: "",
    hideAddButton: false,
    hideAddForm: false,
  }


  toggleAddForm = () => {
    const currentState = this.state.hideAddForm;
    this.setState({
      hideAddForm: !currentState,
      hideAddButton: !currentState
    });
  }


  // Handles input field changes and sets state
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  // Handles validation for new workout (throws an alert on empty fields)
  // Then executes constructNewWorkout to create new workout in database
  handleNewWorkout = (e) => {
    if (this.state.newDate === "" || this.state.newGym === "" || this.state.newNotes === "") {
      alert("No fields should be left blank")
    } else {
      this.constructNewWorkout()
      alert("You have started a new workout! Please start logging your shots")
      this.toggleAddForm()
    }
  }


  //Handles construction of new workout object, then executes createNewWorkout to add new workout to database
  constructNewWorkout = () => {
    this.clearWorkoutId()
    const newWorkout = {
      date: this.state.newDate,
      gym: this.state.newGym,
      notes: this.state.newNotes,
      user_id: this.state.currentUserId
    }
    this.createNewWorkout(newWorkout)
      .then(() => console.log(newWorkout))
  }

  //Handles creation of new workout object
  createNewWorkout = newWorkout => {
    return APIManager.addEntry("workouts", newWorkout)
      .then((response) => {
        this.setState({ workoutId: response.id })
        sessionStorage.setItem( "workoutId", response.id)
      })
  }

  clearWorkoutId = () => {
    sessionStorage.removeItem('workoutId')
  }

  render() {
    return (
      <React.Fragment>
        <div id="newlist_container" className="page_container">
          {/* begin contents */}
          <h2>New Swishlist</h2>
          <div className="workout_card">

            <p>Select date, gym, and enter any notes relevant to your workout</p>
            <p>Click "Start swishlist" to begin</p>
            <div id="newlist_form" className="margin_bottom">
            <table style={{ width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "50px" }}>Date</td>
                  <td><input type="date" onChange={this.handleFieldChange} id="newDate" className="edit_form_input"></input></td>
                </tr>
                <tr>
                  <td>Gym</td>
                  <td><input type="text" onChange={this.handleFieldChange} id="newGym" className="edit_form_input"></input></td>
                </tr>
                <tr>
                  <td>Notes</td>
                  <td><input type="text" onChange={this.handleFieldChange} id="newNotes" className="edit_form_input" style={{ width: "80%" }}/></td>
                </tr>
              </tbody>
            </table>
              <button type="submit" className={this.state.hideAddForm ? "hide" : "btn_edit"} onClick={() => { this.handleNewWorkout() }}>Start Workout</button>
            </div>
            {/* end contents */}
            <div id="shotmap_div" className={this.state.hideAddForm ? null : 'hide'}>
              <hr></hr>
              <ShotMap userId={this.state.currentUserId} workoutId={this.state.workoutId} clearWorkoutId={this.clearWorkoutId} toggleAddForm={this.toggleAddForm} />
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}