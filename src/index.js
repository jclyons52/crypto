import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Ticker from './components/Ticker';
import './index.css';
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import TickerList from './components/TickerList.js'
import * as ticker from "./actions/tickerActions";

ReactDOM.render(
  <Provider store={store}>
     <Router history={browserHistory}>
      <Route path="/" component={App}>
      <IndexRoute component={TickerList} />
       <Route path="tickers/:base/:target" component={Ticker}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

ticker.startWatchers();