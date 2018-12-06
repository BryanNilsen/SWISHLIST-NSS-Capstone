import React, { Component } from "react"
import APIManager from "../../modules/APIManager"

export default class Register extends Component {

  state = {
    registerFName: "",
    registerLName: "",
    registerEmail: "",
    registerNickname: "",
    registerHometown: "",
    registerAge: "",
    registerHeightFt: "",
    registerHeightIn: "",
    registerPhotoURL: "/images/profile_default.png",
    registerPassword: "",
  }

  // Handles input field changes and sets state
  handleFieldChange = (evt) => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }


  // Handles registration validation for new user (throws alerts on empty fields and if user email is taken
  // Then executes constructNewUser to create new user in database
  handleRegister = (e) => {

    if (this.state.registerEmail === "" || this.state.registerFName === "" || this.state.registerPassword === "") {
      alert("No fields should be left blank")
    } else if (this.state.registerEmail.includes("@")) {
      APIManager.getAllEntries("users", `/?email=${this.state.registerEmail}`)
        .then((returns) => {
          if (returns.length > 0) {
            alert("That email is already. Please use another email")
          } else {
            this.constructNewUser()
            alert("You are now registered! Please log in")
            // this.handleChangeForm()
          }
        })
    } else {
      alert("Please enter a valid email")
    }
  }

  //Handles construction of new user object, then executes registerNewUser to add new user to database
  constructNewUser = () => {
    const newUser = {
      firstName: this.state.registerFName,
      lastName: this.state.registerLName,
      email: this.state.registerEmail,
      nickname: this.state.registerNickname,
      hometown: this.state.registerHometown,
      age: this.state.registerAge,
      height_ft: this.state.registerHeightFt,
      height_in: this.state.registerHeightIn,
      photoURL: this.state.registerPhotoURL,
      password: this.state.registerPassword,
    }
    this.registerNewUser(newUser)
      .then(() => console.log(newUser))

  }

    //Handles registration of new user object
    registerNewUser = newUser => {
      return APIManager.addEntry("users", newUser)
    }



  render() {
    return (
      <React.Fragment>
        <div className="">
          <h2>REGISTER</h2>

          <label className="" htmlFor="registerFName">First Name</label>
          <input className="" onChange={this.handleFieldChange} type="text" id="registerFName" placeholder="First Name" required="" autoFocus="" />
          <br />
          <label className="" htmlFor="registerLName">Last Name</label>
          <input className="" onChange={this.handleFieldChange} type="text" id="registerLName" placeholder="Last Name" required="" />
          <br />
          <label className="" htmlFor="registerEmail">Email</label>
          <input className="" onChange={this.handleFieldChange} type="email" id="registerEmail" placeholder="Email address" required="" autoFocus="" />
          <br />
          <label className="" htmlFor="registerNickname">Nickname "AKA"</label>
          <input className="" onChange={this.handleFieldChange} type="text" id="registerNickname" placeholder="Nickname" required="" />
          <br />
          <label className="" htmlFor="registerHometown">Hometown</label>
          <input className="" onChange={this.handleFieldChange} type="text" id="registerHometown" placeholder="Hometown" required="" autoFocus="" />
          <br />
          <label className="" htmlFor="registerAge">Age</label>
          <input className="" onChange={this.handleFieldChange} type="text" id="registerAge" placeholder="Age" required="" />
          <br />
          <label className="" htmlFor="registerHeight">Height</label>
          <select className="" onChange={this.handleFieldChange} type="text" id="registerHeightFt" required="" autoFocus="" >
            <option value="">Feet</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>
          <select className="" onChange={this.handleFieldChange} type="text" id="registerHeightIn" required="" autoFocus="" >
            <option value="">Inches</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
          </select>
          <br />
          <label className="" htmlFor="registerPhotoURL">Photo URL</label>
          <input className="" onChange={this.handleFieldChange} type="text" id="registerPhotoURL" placeholder="Photo URL" required="" />
          <br />
          <label className="" htmlFor="registerPassword">Password</label>
          <input className="" onChange={this.handleFieldChange} type="password" id="registerPassword" placeholder="Password" required="" autoFocus="" />
          <br />

          <button className="" type="submit" onClick={() => {this.handleRegister()} }>REGISTER</button>
        </div>
        <div className="">
        <p>Already Registered?</p>
          <button>SIGN IN</button>
        </div>
      </React.Fragment>
    )
  }
}