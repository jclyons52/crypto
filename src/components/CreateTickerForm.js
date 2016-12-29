import React, { Component } from 'react';
import store from "../store";
import * as watcherActions from "../actions/watcherActions";
import Select from 'react-select';
import CryptoCurrencies from '../enums/CryptoCurrencies';
import Currencies from '../enums/Currencies';

// Be sure to include styles at some point, probably during your bootstrapping
import 'react-select/dist/react-select.css';

export default class CreateTickerForm extends Component {
  constructor(props) {
    super(props);
    this.state = { from: '', to: '' };

    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleFromChange(option) {
    this.setState({
      from: option.value
    });
  }

  handleToChange(option) {
    this.setState({
      to: option.value
    });
  }

  handleSubmit(event) {
    watcherActions.addWatcher(this.state.from, this.state.to);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="form-group">
          <label>From:</label>
          <Select
            value={this.state.from}
            options={CryptoCurrencies}
            onChange={this.handleFromChange}
            />

        </div>
        <div className="form-group">
          <label>To:</label>
          <Select
            value={this.state.to}
            options={Currencies}
            onChange={this.handleToChange}
            />
        </div>
        <input type="submit" value="Submit" className="btn btn-default" />
      </form>
    );
  }
}