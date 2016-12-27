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
        store.dispatch(ticker.fetchTickers());
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
            <table className="table">
            <th>
             
                    <td>ticker</td>
                    <td>ticker</td>
                    <td>ticker</td>
                    <td>ticker</td>
                    <td>ticker</td>
                
            </th>
                {this.renderTickers()}
            </table>
        )
    }
}