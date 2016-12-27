import React, { Component } from 'react';
import store from "../store";
import * as ticker from "../actions/tickerActions";

export default class CreateTickerForm extends Component {
   constructor(props) {
    super(props);
    this.state = {from: '', to: ''};

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFromChange(event) {
    this.setState({
      from: event.target.value
    });
  }

  handleToChange(event) {
    this.setState({
      to: event.target.value
    });
  }

  handleSubmit(event) {
    store.dispatch(ticker.fetchTickers(this.state.from, this.state.to));
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          From:
          <input type="text" value={this.state.from} onChange={this.handleFromChange} />
        </label>
        <label>
          To:
          <input type="text" value={this.state.to} onChange={this.handleToChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}