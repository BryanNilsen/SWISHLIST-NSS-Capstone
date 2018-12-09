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
    workoutId: ""
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
        }
  }


  //Handles construction of new workout object, then executes createNewWorkout to add new workout to database
  constructNewWorkout = () => {
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
      .then((response) => this.setState({ workoutId : response.id}))
    }




  render() {
    return (
      <React.Fragment>
        <div id="newlist_container" className="page_container">
        {/* begin contents */}
          <h2>New Swishlist 'info icon'</h2>
          <p>Select date, gym, and enter any notes relevant to your workout</p>
          <p>Click "Start swishlist" to begin</p>
          <div id="newlist_form">
            <div id="new_date">
              Date
              <input type="date" onChange={this.handleFieldChange} id="newDate"></input>
            </div>
            <div id="new_gym">
              Gym
              <input type="text" onChange={this.handleFieldChange} id="newGym"></input>
            </div>
            <div id="new_notes">
              Notes
              <textarea type="text" onChange={this.handleFieldChange} id="newNotes"/>
            </div>
            <button type="submit" onClick={() => {this.handleNewWorkout()} }>Start Workout</button>
          </div>
          {/* end contents */}
        </div>

        <ShotMap workoutId={this.state.workoutId}/>

      </React.Fragment>
    )
  }
}