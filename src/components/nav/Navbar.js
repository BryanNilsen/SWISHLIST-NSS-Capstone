import React, { Component } from "react"
import { Link } from "react-router-dom"
import "./Navbar.css"

export default class Navbar extends Component {

  logoutUser = () => {
    localStorage.removeItem('userId')
    sessionStorage.removeItem('userId')
  }


  render() {
    return (
      <React.Fragment>
        <nav className="nav">
          <h1 className="logo"><span className="text_orange">swish</span><span className="text_white">list</span></h1>
          <p>
            <Link className="nav_item" to="/" onClick={() => this.logoutUser()}>logout</Link>
            <Link className="nav_item" to="/motivation">motivation</Link></p>

          <ul className="nav_ul">
            <li>
              <Link className="nav_item" to="/newlist">NEW LIST</Link>
            </li>
            <li>
              <Link className="nav_item" to="/viewlists">VIEW LISTS</Link>
            </li>
            <li>
              <Link className="nav_item" to="/stats">STATS</Link>
            </li>
            <li>
              <Link className="nav_item" to="/profile">PROFILE</Link>
            </li>
          </ul>
        </nav>
      </React.Fragment>
    )
  }
}