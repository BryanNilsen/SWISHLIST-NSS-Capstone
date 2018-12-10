import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import "./Shotlog.css"
import TotalGenerator from './TotalGenerator'

export default class ShotsAdded extends Component {


  render() {
    console.log("swishlists from ShotsAdded:", this.props.swishlists)

    return (
      <div className="shotlog_container">
        <div className="shotlog_card">
          <table className="shotlog_table">
            <tbody>
              <tr className="shotlog_rowHeader">
                <td width="40%">Shot Location</td>
                <td width="20%" style={{ textAlign: "center" }} >Attempts</td>
                <td width="20%" style={{ textAlign: "center" }} >Made</td>
                <td width="20%" style={{ textAlign: "center" }} >%</td>
              </tr>
              {
                this.props.swishlists.map((shotlog) => {
                  const shotsMade = Number(shotlog.shotsMade)
                  const shotAttempts = Number(shotlog.shotAttempts)
                  const shootingPercentage = Number(((shotsMade / shotAttempts) * 100).toFixed(1))
                  const tableRowColor = `trc_${Math.floor(((shotsMade / shotAttempts) * 10))}`

                  return (
                    <tr key={shotlog.id} className={`shotlog_hover ${tableRowColor}`}>
                      <td style={{ textAlign: "left", padding: "0px 8px", fontWeight: "bold" }}>{shotlog.shotLocation}</td>
                      <td style={{ textAlign: "center" }}>{shotlog.shotAttempts}</td>
                      <td style={{ textAlign: "center" }} >{shotlog.shotsMade}</td>
                      <td style={{ textAlign: "center" }} >{shootingPercentage}</td>
                    </tr>
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
