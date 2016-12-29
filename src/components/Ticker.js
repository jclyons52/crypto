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

  constructor(){
    super();
    this.state = { timeInterval: 60 * 15 };
  }

  render() {
    const list = this.getTickers();
    return (
      <div>
        <h1> {this.props.params.base} TO {this.props.params.target}</h1>
        <div className="row">
        <div className="col-sm-6">Set Time Interval:</div>
        <div className="col-sm-6">
          <button className="btn btn-default" onClick={this.setTickerInterval.bind(this, 60*15)}>15 min</button>
          <button className="btn btn-default" onClick={this.setTickerInterval.bind(this, 60*30)}>30 min</button>
          <button className="btn btn-default" onClick={this.setTickerInterval.bind(this, 60*60)}>60 min</button>
        </div>
        </div>
        <ul>
          {this.graphValues(list)}
        </ul>
      </div>
    )
  }

  setTickerInterval(interval) {
    this.setState({ timeInterval: interval });
  }

  graphValues(list) {
    var filtered = this.filterByTimeInterval(this.state.timeInterval, list);
    const prices = filtered.map((ticker) => {
      return ticker.price;
    })
    const times = filtered.map(this.formattDate);
    const data = this.getChartInfo(prices, times);
    return (<Line data={data.data} options={data.options} width="600" height="250" />)
  }

  filterByTimeInterval(interval, tickers) {
    const final = tickers.reduce((carry, ticker) => {
      if ((ticker.timestamp - interval) > carry.timestamp) {
        carry.tickers.push(ticker);
        carry.timestamp = ticker.timestamp;
      }
      
      return carry;
    },{
      tickers: [],
      timestamp: 0
    })

    return final.tickers;
  }

  formattDate(ticker) {
    var date = new Date(ticker.timestamp * 1000);
    var year = date.getFullYear();
    var month = date.getMonth();
    var day = date.getDay();
    var hours = date.getHours();
    var minutes = "0" + date.getMinutes();
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = 
    `${day}/${month}/${year}` + 
    hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
  }

  getTickers() {
    const base = this.props.params.base;
    const target = this.props.params.target;
    const tickers = this.props.tickers[base + target];
    if (this.props.watchers.filter(watcher => watcher.from === base && watcher.to === target).length < 1) {
      watcherActions.addWatcher(base, target);
    }
    if (tickers !== undefined) {
      return tickers;
    }

    if (this.props.fetching === false) {
      store.dispatch(tickerActions.fetchTickers(base, target));
    }
    return [];
  }

  getChartInfo(data, times) {
    return {
      data: {
        labels: times,
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