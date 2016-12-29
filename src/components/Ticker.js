import React, { Component } from "react";
import store from "../store";
import * as tickerActions from "../actions/tickerActions";
import * as watcherActions from "../actions/watcherActions";
import { connect } from "react-redux";
import { Line } from "react-chartjs";

@connect((store) => {
  return {
    tickers: store.tickers.sorted,
    watchers: store.watchers.watchers,
    fetching: store.tickers.fetching
  }
})
export default class Ticker extends Component {

  render() {
    const list = this.getTickers();
    return (
      <div>
      <h1> {this.props.params.base} TO {this.props.params.target}</h1>
        <ul>
          {this.graphValues(list)}
        </ul>
      </div>
    )
  }

  graphValues(list) {
    const prices = list.map((ticker) => {
      return ticker.price;
    })
    const data = this.getChartInfo(prices);
    return (<Line data={data.data} options={data.options} width="600" height="250"/>)
  }

  getTickers() {
    const base = this.props.params.base;
    const target = this.props.params.target;
    const tickers = this.props.tickers[base + target];
    if (this.props.watchers.filter(watcher => watcher.from === base && watcher.to === target ).length < 1) {
      watcherActions.addWatcher(base, target);
    }
    if(tickers !== undefined) {
      return tickers;
    } 

    if (this.props.fetching === false) {
      store.dispatch(tickerActions.fetchTickers(base, target));
    }
    return [];
  }

  getChartInfo(data) {
    return {
    data: {
        labels: data,
        datasets: [{
            label: 'Price',
            data: data,
        }]
    },
   options: {
        responsive: false
    }
}
  }
}