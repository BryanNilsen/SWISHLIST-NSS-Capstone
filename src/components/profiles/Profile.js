import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class Profile extends Component {

  state = {
    users: []
  }


  componentDidMount() {
    APIManager.getAllEntries("users")
      .then((users) => {
        this.setState({ users: users })
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
          <p>Users Will Go Here</p>
          <section id="user_card">
        {
          this.state.users.map(user =>
            <div className="user_card" key={user.id}>
                <h2 className="oblique">{user.firstName} {user.lastName}</h2>
                <img src={user.photoURL} className="user_image" alt={user.title} width="100px"></img>
                <p>Age: {user.age}</p>
                <p>Hometown: {user.hometown}</p>
                <p>Height: {user.height_ft}'{user.height_in}"</p>

            </div>
          )
        }
          </section>
        </div>
      </React.Fragment>
    )
  }
}