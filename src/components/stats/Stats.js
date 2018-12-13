import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import './Stats.css'

export default class Stats extends Component {

  state = {

  }


  componentDidMount() {



  }


  render() {
    return (
      <React.Fragment>
        <div id="stats_container" className="page_container">
          {/* begin contents */}
          <h2>Stats</h2>
          {
            <div className="user_card">
            <p>stats go here</p>
            </div>
          }

        </div>
      </React.Fragment>
    )
  }
}