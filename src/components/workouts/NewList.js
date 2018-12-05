import React, { Component } from "react"
import "./ShotMap.css"
import ShotMap from './ShotMap';

export default class NewList extends Component {


  render() {
    return (
      <React.Fragment>
        <div id="newlist_container">
        {/* begin contents */}
          <h2>New Swishlist 'info icon'</h2>
          <p>Select date, gym, and enter any notes relevant to your workout</p>
          <p>Click "Start swishlist" to begin</p>
          <div id="newlist_form">
            <div id="new_date">
              Date
              <input type="date"></input>
            </div>
            <div id="new_gym">
              Gym
              <input type="text"></input>
            </div>
            <div id="new_notes">
              Notes
              <textarea type="text"/>
            </div>
            <button>Start swishlist</button>
          </div>
          <p>this is the New.js file rendering ShotMap.js below</p>

          {/* end contents */}
        </div>

        <ShotMap />
      </React.Fragment>
    )
  }
}