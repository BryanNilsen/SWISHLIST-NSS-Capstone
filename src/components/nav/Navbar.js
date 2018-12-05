import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

export default class Navbar extends Component {


  render() {
    return (
      <React.Fragment>
        <nav className="nav">
          <h1 className="logo"><span className="logo_orange">swish</span><span className="logo_white">list</span></h1>
          <p>logout / inspiration</p>
          <ul className="nav_ul">
            <li className="nav_item">
              <Link to="/newlist">NEW LIST</Link>
            </li>
            <li className="nav_item">
              <Link to="/viewlists">VIEW LISTS</Link>
            </li>
            <li className="nav_item">
              <Link to="/stats">STATS</Link>
            </li>
            <li className="nav_item">
              <Link to="/profile">PROFILE</Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}