import React, { Component } from 'react';
import store from "../store";
import * as tickerActions from "../actions/tickerActions";
import { connect } from "react-redux";
import CreateTickerForm from "./CreateTickerForm";
import { Link } from 'react-router'
import _ from "lodash"

@connect((store) => {
  return {
    tickers: store.tickers.latest
  }
})
export default class TickerList extends Component {

  constructor() {
    super();
    tickerActions.updateWatchers();
  }

  renderTickers() {
    const tickers = this.props.tickers;

    return tickers.map((ticker) => {
      const link = `/tickers/${ticker.base}/${ticker.target}`;
      return (
        <tr key={ticker.timestamp}>
          <td>{ticker.base}</td>
          <td>{ticker.target}</td>
          <td>{ticker.price}</td>
          <td>{ticker.volume}</td>
          <td>{ticker.change}</td>
          <td>
          <Link to={link}>view</Link>
          <button onClick={this.removeWatcher.bind(this, ticker)}>Remove</button>
          </td>

        </tr>
      )
    })
  }

  removeWatcher(ticker) {
    store.dispatch(tickerActions.removeWatcher(ticker.base, ticker.target))
  }

  render() {
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>base</th>
              <th>target</th>
              <th>price</th>
              <th>volume</th>
              <th>change</th>
            </tr>
          </thead>
          <tbody>
            {this.renderTickers()}
          </tbody>
        </table>
        <CreateTickerForm></CreateTickerForm>
      </div>
    )
  }
}