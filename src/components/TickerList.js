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
    watcherActions.removeWatcher(ticker.base, ticker.target)
  }

  render() {
    const buttonStyles = {
      marginTop: '25px'
    }
    return (
      <div>
        <div className="row">
          <div className="col-sm-6">
            <h1>Tickers:</h1>
          </div>
          <div className="col-sm-6">
            <Link className="btn btn-primary pull-right" style={buttonStyles} to='/tickers/create'>Create</Link>
          </div>
        </div>
        <div className="row">
          <table className="table table-striped">
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
        </div>
      </div>
    )
  }
}