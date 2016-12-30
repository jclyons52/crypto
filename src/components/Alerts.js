import React, { Component } from "react";
import { Link } from "react-router";
import store from "../store";
import { connect } from "react-redux";

@connect((store) => {
  return {
    alerts: store.alerts.alerts,
    tickers: store.tickers.latest
  }
})
export default class Alerts extends Component {
  render () {
    const buttonStyles = {
      marginTop: '25px'
    }
    return (
       <div>
        <div className="row">
          <div className="col-sm-6">
            <h1>Alerts:</h1>
          </div>
          <div className="col-sm-6">
            <Link className="btn btn-primary pull-right" style={buttonStyles} to='/alerts/create'>Create</Link>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h1>Active Alerts:</h1>
          </div>
        </div>
       <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>base</th>
                <th>operation</th>
                <th>target</th>
                <th>limit</th>
              </tr>
            </thead>
            <tbody>
            {this.getRows(this.getActiveAlerts())}
            </tbody>
          </table>
        </div>
        <div className="row">
          <div className="col-sm-6">
            <h1>Inactive Alerts:</h1>
          </div>
        </div>
        <div className="row">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>base</th>
                <th>operation</th>
                <th>target</th>
                <th>limit</th>
              </tr>
            </thead>
            <tbody>
            {this.getRows(this.getInactiveAlerts())}
            </tbody>
          </table>
        </div>
      </div>
    )
  }

  getRows(alerts) {
     return alerts.map((alert) => {
      return (
        <tr key={Math.random()}>
          <td>{alert.base}</td>
          <td>{alert.operation}</td>
          <td>{alert.target}</td>
          <td>{alert.limit}</td>
        </tr>
      )
    })
  }

  getInactiveAlerts(){
    return this.props.alerts.filter(alert => !alert.active)
  }

  getActiveAlerts() {
    return this.props.alerts.filter(alert => alert.active);
  }

  alertShouldActivate(alert, ticker) {
  if (alert.dismissed) {
    return false;
  }
  if (ticker.base !== alert.base || ticker.target !== alert.target) {
    return false;
  }
  if (alert.operation === "GREATER_THAN") {
    if (ticker.price > alert.limit) {
      return true;
    }
    return false;
  }
  if (alert.operation === "LESS_THAN") {
    if (ticker.price < alert.limit) {
      return true;
    }
    return false;
  }
  return false;
}
}