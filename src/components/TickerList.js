import React, { Component } from 'react';
import store from "../store";
import * as watcherActions from "../actions/watcherActions";
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
    watcherActions.updateWatchers();
  }

  renderTickers() {
    const tickers = this.props.tickers;

    return tickers.map((ticker) => {
      const link = `/tickers/${ticker.base}/${ticker.target}`;
      return (
        <tr key={Math.random()}>
          <td>{ticker.base}</td>
          <td>{ticker.target}</td>
          <td>{ticker.price}</td>
          <td>{ticker.volume}</td>
          <td>{ticker.change}</td>
          <td>
          <Link to={link} className="btn btn-default" >view</Link>
          <button onClick={this.removeWatcher.bind(this, ticker)} className="btn btn-default" >Remove</button>
          </td>

        </tr>
      )
    })
  }

  removeWatcher(ticker) {
    store.dispatch(watcherActions.removeWatcher(ticker.base, ticker.target))
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