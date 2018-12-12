import React, { Component } from "react"
import "./Shotlog.css"
import ShotsAddedRow from './ShotsAddedRow'

export default class ShotsAdded extends Component {



  render() {
    console.log("swishlists from ShotsAdded:", this.props.swishlists)

    return (
      <div className="shotlog_container">
        <div className="shotlog_card">
          <table className="shotlog_table">
            <tbody>
              <tr className="shotlog_rowHeader">
                <td width="30%">Shot Location</td>
                <td width="20%" style={{ textAlign: "center" }} >Attempts</td>
                <td width="20%" style={{ textAlign: "center" }} >Made</td>
                <td width="20%" style={{ textAlign: "center" }} >%</td>
                <td width="10%" style={{ textAlign: "center" }} >Delete</td>
              </tr>
              {
                this.props.swishlists.map((shotlog) => {
                  {/* const shotsMade = Number(shotlog.shotsMade)
                  const shotAttempts = Number(shotlog.shotAttempts)
                  const shootingPercentage = Number(((shotsMade / shotAttempts) * 100).toFixed(1))
                  const tableRowColor = `trc_${Math.floor(((shotsMade / shotAttempts) * 10))}` */}

                  return (

                    <ShotsAddedRow shotlog={shotlog} deleteSwishlist={this.props.deleteSwishlist} editSwishlist={this.props.editSwishlist} key={shotlog.id}/>

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
