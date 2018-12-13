import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class Motivation extends Component {

  state = {
    quotes: [],
    initialized: false
  }


  componentDidMount() {
    let array = [
      APIManager.getAllEntries("quotes")
        .then((quotes) => {
          this.setState({
            quotes: quotes,
            quoteCount: quotes.length
          })
        })
    ]
    return Promise.all(array)
      .then(() => this.setState({
        initialized: true,
      }))
  }


  // generateRandomNumber = (number) => Math.floor((Math.random() * number) + 1)

  render() {
    if (this.state.initialized === true) {
      console.log("quotes:", this.state.quotes)
      let randomQuote = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]

      return (
          <div className="basketball_bkg">
            <div id="motivation_container" className="page_container">
              {/* begin contents */}
              <h2>Motivation</h2>
              <section id="quote_card">
                <div className="quote_card" key={randomQuote.id}>
                  <h2 className="oblique">{randomQuote.quote}</h2>
                  <p>{randomQuote.author}</p>
                </div>
              </section>
            </div>
          </div>
      )
    } else {
      return (
        <div><p>loading...</p></div>
      )
    }
  }
}