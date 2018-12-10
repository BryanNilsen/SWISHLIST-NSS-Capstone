import React, { Component } from 'react';
import './ShotMap.css';
import APIManager from '../../modules/APIManager'
import ShotsAdded from './ShotsAdded'

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


  handleCourtMapClick = (evt) => {
    const shotLocationId = evt.target.id
    console.log("event:", evt.target.id)
    this.setState({ newShotLocation: shotLocationId })

  }


  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    console.log("clicked:", evt.target.value)
  }


  buildShotAttemptsSelect = () => {
    let shotAttemptsSelect = []
    for (let i = 0; i <= 100; i+=5) {
        shotAttemptsSelect.push(<option key={i} value={i}>{i}</option>);
    }
    return shotAttemptsSelect;
  }


  buildShotsMadeSelect = () =>{
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
      this.setState({newShotLocation: ""})
    }
  }

  //Handles construction of new swishlist object, then executes createNewSwishlist to add new swishlist to database
  constructNewSwishlist = () => {
    const newSwishlist = {
      workout_id: this.props.workoutId,
      shotLocation: this.state.newShotLocation,
      shotAttempts: Number(this.state.newShotAttempts),
      shotsMade: Number(this.state.newShotsMade),
    }
    console.log("New Swishlist:", newSwishlist)
    this.createNewSwishlist(newSwishlist)
  }

  //Handles creation of new swishlist object
  createNewSwishlist = newSwishlist => {
    let swishlistArray = this.state.swishlistArray
    return APIManager.addEntry("swishlists", newSwishlist)
    .then(APIManager.getAllEntries("swishlists", `?workout_id=${this.props.workoutId}`))
    .then((swishlists) => {
      swishlistArray.push(swishlists)
      this.setState({ swishlists: swishlistArray })
  })
}

  finishWorkout = () => {
    sessionStorage.removeItem('workoutId')
  }


  render() {
    return (
      <div className="main_wrapper">
        <div className="court_wrapper">

          {/* court image */}
          <img src="/images/swishlist_court.svg" alt="shooting locations map"></img>

          {/* <!-- begin court text overlay div --> */}
          <div className="court_text">
            <p className="underline clear_padding">select shot location</p>
            <p className="clear_padding">shots attempted -
              <select id="newShotAttempts" onChange={this.handleFieldChange}>
                <option defaultValue="selected">Select</option>
                { this.buildShotAttemptsSelect() }
              </select>
            </p>
            <p className="clear_padding">shots made -
              <select id="newShotsMade" onChange={this.handleFieldChange}>
                <option defaultValue="selected">Select</option>
                { this.buildShotsMadeSelect() }
              </select>
            </p>
            <p className="clear_padding">
              <button type="submit" onClick={this.handleNewSwishlist}>Add Shots</button>
              <button type="submit" onClick={this.finishWorkout}>Finish Workout</button>
              {/* need to remove workout Id from session storage when finished with workout */}
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
                  <div id={shotspot.name} className="spot" style={spotStyle} key={shotspot.id}></div>
                )
              })
            }
          </div>
        </div>
        <ShotsAdded workoutId={this.props.workoutId} swishlists={this.state.swishlists}/>
      </div>
    );
  }
}


