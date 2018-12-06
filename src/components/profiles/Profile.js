import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class Profile extends Component {

  state = {
    currentUserId: this.props.getCurrentUser(),
  }


  componentDidMount() {
    APIManager.getEntry("users", this.state.currentUserId)
      .then((user) => {
        this.setState({
          userId : user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          photoURL: user.photoURL,
          age: user.age,
          hometown: user.hometown,
          height_ft: user.height_ft,
          height_in: user.height_in,
        })
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
          <section id="user_card">
        {
            <div className="user_card" key={this.state.userId}>
                <h2 className="oblique">{this.state.firstName} {this.state.lastName}</h2>
                <img src={this.state.photoURL} className="user_image" alt={this.state.firstName} width="100px"></img>
                <p>Age: {this.state.age}</p>
                <p>Hometown: {this.state.hometown}</p>
                <p>Height: {this.state.height_ft}&#39;{this.state.height_in}"</p>
            </div>
        }
          </section>
        </div>
      </React.Fragment>
    )
  }
}