import React, { Component } from 'react';
import store from "../store";
import * as ticker from "../actions/tickerActions";
import { connect } from "react-redux";
import CreateTickerForm from "./CreateTickerForm";

@connect((store) => {
  return {
    tickers: store.tickers
  }
})
export default class Ticker extends Component {

  constructor() {
    super();
    store.dispatch(ticker.fetchTickers('btc', 'usd'));
  }

  renderTickers() {
    console.log(this.props);
    return this.props.tickers.tickers.map((ticker) => {
      return (
        <tr key={ticker.timestamp}>
          <td>{ticker.base}</td>
          <td>{ticker.target}</td>
          <td>{ticker.price}</td>
          <td>{ticker.volume}</td>
          <td>{ticker.change}</td>
        </tr>
      )
    })
  }

  render() {
    return (
      <div>
        <table className="table">
          <tr>
            <th>base</th>
            <th>target</th>
            <th>price</th>
            <th>volume</th>
            <th>change</th>
          </tr>
          {this.renderTickers()}
        </table>
        <CreateTickerForm></CreateTickerForm>
      </div>
    )
  }

}