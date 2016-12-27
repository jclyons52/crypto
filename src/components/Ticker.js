/* eslint-disable */

import React, { Component } from 'react';
import store from "../store";
import * as ticker from "../actions/tickerActions";
import { connect } from "react-redux";

@connect((store) => {
    return {
        tickers: store.tickers
    }
})
export default class Ticker extends Component {

    constructor() {
        super();
    }

    renderTickers() {
        return this.props.tickers.map((ticker) => {
            return (
                <tr>
                    <td>{ticker.base}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <table className="table">
                {this.renderTickers}
            </table>
        )
    }
}