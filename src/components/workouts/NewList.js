import React, { Component } from "react"
import "./ShotMap.css"
import ShotMap from './ShotMap';

export default class NewList extends Component {


  render() {
    return (
      <React.Fragment>
          <p className="logo_white">this is the New.js file rendering ShotMap.js below</p>
        <ShotMap />
      </React.Fragment>
    )
  }
}