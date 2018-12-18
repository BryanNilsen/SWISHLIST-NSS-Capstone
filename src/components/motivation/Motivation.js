import React, { Component } from "react"
import APIManager from '../../modules/APIManager'
import './Motivation.css'

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


  render() {
    if (this.state.initialized === true) {
      let randomQuote = this.state.quotes[Math.floor(Math.random() * this.state.quotes.length)]

      return (
          <div className="basketball_bkg">
            <div id="motivation_container" className="page_container">
              {/* begin contents */}
              <h2>&nbsp;</h2>
              <section id="quote_card">
                <div className="quote_card" key={randomQuote.id}>
                  <h2 className="oblique">"{randomQuote.quote}"</h2>
                  <p>- {randomQuote.author}</p>
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