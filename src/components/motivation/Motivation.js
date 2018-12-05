import React, { Component } from "react"
import APIManager from '../../modules/APIManager'

export default class Motivation extends Component {

  state = {
    quotes: []
  }


  componentDidMount() {
    APIManager.getAllEntries("quotes")
      .then((quotes) => {
        this.setState({ quotes: quotes })
      })
  }

  render() {
    return (
      <React.Fragment>
        <div className="">
          <p>Motivational Quotes Will Go Here</p>
          <section id="quote_card">
        {
          this.state.quotes.map(quote =>
            <div className="quote_card" key={quote.id}>
                <h2 className="oblique">{quote.quote}</h2>
                <p>{quote.author}</p>

            </div>
          )
        }
          </section>
        </div>
      </React.Fragment>
    )
  }
}