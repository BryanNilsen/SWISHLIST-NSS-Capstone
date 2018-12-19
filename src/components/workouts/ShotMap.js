import React, { Component } from 'react';
import './ShotMap.css';
import APIManager from '../../modules/APIManager'
import ShotsAdded from './ShotsAdded'
import swishlist_court from '../../images/swishlist_court.svg'

export default class ShotMap extends Component {

  state = {
    clickedSpot: null,
    newShotAttempts: "",
    newShotsMade: "",
    newShotLocation: "",
    shotSpots: [],
    swishlists: [],
    swishlistArray: [],
  }




  componentDidMount() {
    APIManager.getAllEntries("shotSpots")
      .then((shotSpots) => {
        this.setState({ shotSpots: shotSpots })
      })

    APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`)
      .then((swishlists) => {
        this.setState({ swishlists: swishlists })
      })
  }


  deleteSwishlist = (id) => {
    this.setState({ swishlistArray: [] })
    APIManager.deleteEntry("swishlists", id)
      .then(() => APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`))
      .then(swishlists => this.setState({ swishlists: swishlists }))
  }


  editSwishlist = (id, editedThing) => {
    this.setState({ swishlistArray: [] })
    APIManager.editEntry("swishlists", id, editedThing)
      .then(() => APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`))
      .then(swishlists => this.setState({ swishlists: swishlists }))
  }

  handleCourtMapClick = (evt) => {
    const shotLocationId = evt.target.id
    const shotLocationName = evt.target.title
    this.setState({
      newShotLocation: +shotLocationId,
      newShotLocationName: shotLocationName
     })
  }


  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  buildShotAttemptsSelect = () => {
    let shotAttemptsSelect = []
    for (let i = 0; i <= 100; i += 5) {
      shotAttemptsSelect.push(<option key={i} value={i}>{i}</option>);
    }
    return shotAttemptsSelect;
  }


  buildShotsMadeSelect = () => {
    const shotsAttempted = this.state.newShotAttempts
    let shotsMadeSelect = []
    for (var i = 0; i <= shotsAttempted; i++) {
      shotsMadeSelect.push(<option key={i} value={i}>{i}</option>);
    }
    return shotsMadeSelect;
  }


  // Handles validation for new swishlist (throws an alert on empty fields or unselected shot location)
  // Then executes constructSwishlist to create new workout in database
  handleNewSwishlist = (e) => {
    if (this.state.newShotAttempts === "" || this.state.newShotsMade === "") {
      alert("No fields should be left blank")
    } else if (this.state.newShotLocation === "") {
      alert("Please select a shot location on the map")
    } else {
      this.constructNewSwishlist()
      alert("Shot recorded. Enter more or end workout to finish.")
      // clear state for new shots
      this.setState({ newShotLocation: "" })
    }
  }

  //Handles construction of new swishlist object, then executes createNewSwishlist to add new swishlist to database
  constructNewSwishlist = () => {
    const newSwishlist = {
      workout_id: this.props.workoutId,
      user_id: this.props.userId,
      shotLocation: this.state.newShotLocation,
      shotAttempts: Number(this.state.newShotAttempts),
      shotsMade: Number(this.state.newShotsMade),
    }
    this.createNewSwishlist(newSwishlist)
  }

  //Handles creation of new swishlist object
  createNewSwishlist = newSwishlist => {
    let swishlistArray = this.state.swishlistArray
    return APIManager.addEntry("swishlists", newSwishlist)
      .then(APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`))
      .then((swishlists) => {
        swishlistArray.push(swishlists)
        this.setState({
          swishlists: swishlistArray
         })
      })
  }

  finishWorkout = () => {
    this.props.clearWorkoutId();
    this.props.toggleAddForm()
  }

  render() {
    return (
      <div className="main_wrapper">
        <div className="court_wrapper">

          {/* court image */}
          <img src={swishlist_court} alt="shooting locations map"></img>

          {/* <!-- begin court text overlay div --> */}
          <div className="court_text">
            <p className="underline clear_padding">select shotspot: {this.state.newShotLocationName}</p>


            <p className="clear_padding">shots attempted -
              <select id="newShotAttempts" className="shot_select" onChange={this.handleFieldChange}>
                <option defaultValue="selected">Select</option>
                {this.buildShotAttemptsSelect()}
              </select>
            </p>
            <p className="clear_padding">shots made -
              <select id="newShotsMade" className="shot_select" onChange={this.handleFieldChange}>
                <option defaultValue="selected">Select</option>
                {this.buildShotsMadeSelect()}
              </select>
            </p>
            <p className="clear_padding">
              <button type="submit" onClick={this.handleNewSwishlist}>Add Shots</button>
              <button type="submit" onClick={this.finishWorkout}>Finish Workout</button>
            </p>
          </div>
          {/* end court text div */}

          {/* begin shot locations divs generated from database */}
          <div id="shotspots" onClick={this.handleCourtMapClick}>

            {
              this.state.shotSpots.map((shotspot) => {
                const spotStyle = {
                  top: shotspot.top,
                  left: shotspot.left,
                }

                return (
                  <div id={shotspot.id} className="spot" style={spotStyle} key={shotspot.id} title={shotspot.name}></div>
                )
              })
            }
          </div>
        </div>
        <ShotsAdded workoutId={this.props.workoutId} swishlists={this.state.swishlists} deleteSwishlist={this.deleteSwishlist} editSwishlist={this.editSwishlist}/>
      </div>
    );
  }
}


