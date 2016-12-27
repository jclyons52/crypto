import { combineReducers } from "redux";

import tickers from "./tickerReducer";

export default combineReducers({
    tickers,
})