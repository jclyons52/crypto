import { combineReducers } from "redux";

import tickers from "./tickerReducer";
import watchers from "./watcherReducer";

export default combineReducers({
    tickers,
    watchers,
})