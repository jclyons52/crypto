import { combineReducers } from "redux";

import tickers from "./tickerReducer";
import watchers from "./watcherReducer";
import alerts from './alertReducer';

export default combineReducers({
    tickers,
    watchers,
    alerts
})