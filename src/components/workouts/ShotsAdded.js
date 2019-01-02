import React, { Component } from "react"
import "./Shotlog.css"
import ShotsAddedRow from './ShotsAddedRow'
import APIManager from '../../modules/APIManager'

export default class ShotsAdded extends Component {

  state = {
    shotspots: []
  }


  componentDidMount() {

    APIManager.getAllEntries("shotSpots")
      .then(shotspots => this.setState({ shotspots : shotspots }))
  }

  render() {

    return (
      <div className="shotlog_container">
        <div className="shotlog_card">
          <table className="shotlog_table">
            <tbody>
              <tr className="shotlog_rowHeader">
                <td width="35%">Shot Location</td>
                <td width="25%" style={{ textAlign: "center" }} >Attempts</td>
                <td width="20%" style={{ textAlign: "center" }} >Made</td>
                <td width="15%" style={{ textAlign: "center" }} >%</td>
                <td width="15%" style={{ textAlign: "center" }} >Delete</td>
              </tr>
              {
                this.props.swishlists.map((shotlog) => {
                  let locationName = this.state.shotspots.find(shotspot => shotlog.shotLocation === shotspot.id).name
                  return (

                    <ShotsAddedRow locationName={locationName} shotlog={shotlog} deleteSwishlist={this.props.deleteSwishlist} editSwishlist={this.props.editSwishlist} key={shotlog.id} />

                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}
