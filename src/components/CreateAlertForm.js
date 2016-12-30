import React, { Component } from 'react';
import store from "../store";
import * as watcherActions from "../actions/watcherActions";
import Select from 'react-select';
import CryptoCurrencies from '../enums/CryptoCurrencies';
import Currencies from '../enums/Currencies';
import { Link } from "react-router"
import * as alertActions from '../actions/alertActions';
// Be sure target include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';


export default class CreateTickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { base: '', target: '', operation: '', limit: 0 };

    this.operations = [
      {
        label: "Greater than",
        value: "GREATER_THAN"
      },
      {
        label: 'Less than',
        value: 'LESS_THAN'
      }
    ]

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleOperationChange = this.handleOperationChange.bind(this);
    this.handleLimitChange = this.handleLimitChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFromChange(option) {
    this.setState({
      base: option.value
    });
  }

  handleToChange(option) {
    this.setState({
      target: option.value
    });
  }

handleOperationChange(option) {
    this.setState({
      operation: option.value
    });
  }

handleLimitChange(event) {
    this.setState({
      limit: event.target.value
    });
  }

  handleSubmit(event) {
    // watcherActions.addWatcher(this.state.base, this.state.target);
    event.preventDefault();
    alertActions.addAlert(this.state);
    alertActions.updateAlerts(store.getState().tickers.latest);

    this.props.history.push('/alerts');
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>From:</label>
          <Select
            value={this.state.base}
            options={CryptoCurrencies}
            onChange={this.handleFromChange}
            />

        </div>
        <div className="form-group">
          <label>To:</label>
          <Select
            value={this.state.target}
            options={Currencies}
            onChange={this.handleToChange}
            />
        </div>
         <div className="form-group">
          <label>Operation:</label>
          <Select
            value={this.state.operation}
            options={this.operations}
            onChange={this.handleOperationChange}
            />
        </div>
         <div className="form-group">
          <label>Limit:</label>
          <input type="number" value={this.state.limit} onChange={this.handleLimitChange} />
        </div>
        <div className="row">
          <div className="col-xs-1">
            <input type="submit" value="Submit" className="btn btn-primary" />
          </div>
          <div className="col-xs-2">
            <Link target='/' className='btn btn-default'>Back</Link>
          </div>


        </div>
      </form>
    );
  }
}