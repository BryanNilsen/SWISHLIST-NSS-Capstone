import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
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

  render() {
    return (
      <React.Fragment>
        <div className="">
          <section id="workouts" className="">
            <p>View swishlists</p>
            {
              this.state.workouts.map(workout =>
                <div className="card_container">
                  <div className="workout_card" key={workout.id}>
                    <h3>{workout.date}: {workout.gym}</h3>
                    <p>{workout.notes}</p>
                  </div>
                </div>
              )
            }
          </section>
        </div>
      </React.Fragment>
    )
  }
}
