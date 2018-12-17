import React, { Component } from "react"
import "./Shotlog.css"


export default class ShotsAddedRow extends Component {

  state = {
    shotAttemptsEdit: false,
    shotsMadeEdit: false,
  }


  handleAttemptsEditState = () => {
    this.setState({
      shotAttemptsEdit: true
    })
  }

  handleMadeEditState = () => {
    this.setState({
      shotsMadeEdit: true
    })
  }

  buildShotAttemptsSelect = () => {
    let shotAttemptsSelect = []
    for (let i = 0; i <= 100; i += 5) {
      shotAttemptsSelect.push(<option key={i} value={i}>{i}</option>);
    }
    return shotAttemptsSelect;
  }


  buildShotsMadeSelect = (shotAttempts) => {
    let shotsMadeSelect = []
    for (let i = 0; i <= shotAttempts; i += 1) {
      shotsMadeSelect.push(<option key={i} value={i}>{i}</option>);
    }
    return shotsMadeSelect;
  }

  handleShotAttemptsEdit = (evt) => {
    const itemToPatch = {shotAttempts: Number(evt.target.value)}
    this.props.editSwishlist(evt.target.id, itemToPatch)
    this.setState({
      shotAttemptsEdit: false,
      shotsMadeEdit: false,
    })
  }

  handleShotsMadeEdit = (evt) => {
    const itemToPatch = {shotsMade: Number(evt.target.value)}
    this.props.editSwishlist(evt.target.id, itemToPatch)
    this.setState({
      shotAttemptsEdit: false,
      shotsMadeEdit: false
    })
  }

  render() {
    const shotlog = this.props.shotlog
    const shotsMade = Number(shotlog.shotsMade)
    const shotAttempts = Number(shotlog.shotAttempts)
    const shootingPercentage = Number(((shotsMade / shotAttempts) * 100).toFixed(1))
    const tableRowColor = `trc_${Math.floor(((shotsMade / shotAttempts) * 10))}`
    const locationName = this.props.locationName

    return (
      <tr key={shotlog.id} className={`shotlog_hover ${tableRowColor}`}>
        {/* <td style={{ textAlign: "left", padding: "0px 8px", fontWeight: "bold" }}>{shotlog.shotLocation}</td> */}
        <td style={{ textAlign: "left", padding: "0px 8px", fontWeight: "bold" }}>{locationName}</td>
        <td style={{ textAlign: "center" }} onClick={this.handleAttemptsEditState}>
          {
            this.state.shotAttemptsEdit
              ?
              (
                <select id={shotlog.id} onChange={this.handleShotAttemptsEdit}>
                  <option defaultValue="selected">Select</option>
                  {this.buildShotAttemptsSelect()}
                </select>
              )
              :
              shotlog.shotAttempts
          }
        </td>
        <td style={{ textAlign: "center" }} onClick={this.handleMadeEditState}>
        {
            this.state.shotsMadeEdit
              ?
              (
                <select id={shotlog.id} onChange={this.handleShotsMadeEdit}>
                  <option defaultValue="selected">Select</option>
                  {this.buildShotsMadeSelect(shotlog.shotAttempts)}
                </select>
              )
              :
              shotlog.shotsMade
          }
        </td>
        <td style={{ textAlign: "center" }} >{shootingPercentage}</td>
        <td style={{ textAlign: "center" }} ><button type="submit" onClick={() => this.props.deleteSwishlist(shotlog.id)}>X</button></td>
      </tr>
    )
  }
}