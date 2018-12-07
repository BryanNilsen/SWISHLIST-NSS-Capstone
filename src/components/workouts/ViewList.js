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
    APIManager.getAllEntries("workouts", `?userId=${this.state.currentUserId}`)
      .then((workouts) => {
        this.setState({ workouts: workouts })
      })
  }

  deleteWorkout = (id) => APIManager.deleteEntry("workouts", id)
    .then(() => APIManager.getAllEntries("workouts", `?userId=${this.state.currentUserId}`))
    .then(workouts => this.setState({ workouts: workouts }))

  render() {
    return (
      <React.Fragment>
        <div className="">
          <section id="workouts" className="">
            <p>View swishlists</p>
            {
              this.state.workouts.map((workout) => {
                return (
                <div className="card_container" key={workout.id}>
                  <div className="workout_card">
                    <h3>{workout.date}: {workout.gym}</h3>
                    <p>{workout.notes}</p>
                    <p>collapse / expand swishlist container links</p>
                    {/* begin swishlists */}

                    <Shotlog workoutId={workout.workout_id} />

                    <div id="workoutEditDelete">
                      <button onClick={() => this.deleteWorkout(workout.id)}>Delete</button>
                    </div>
                  </div>
                </div>
              )})
            }
          </section>
        </div>
      </React.Fragment>
    )
  }
}
