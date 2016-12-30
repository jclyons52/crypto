import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Ticker from './components/Ticker';
import './index.css';
import { Provider } from "react-redux";
import store from "./store";
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import TickerList from './components/TickerList.js'
import CreateTickerForm from "./components/CreateTickerForm";
import * as watcherActions from "./actions/watcherActions";
import Alerts from "./components/Alerts";
import CreateAlertForm from "./components/CreateAlertForm";

ReactDOM.render(
  <Provider store={store}>
     <Router history={hashHistory}>
      <Route path="/" component={App}>
      <IndexRoute component={TickerList} />
      <Route path="tickers/create" component={CreateTickerForm}/>
       <Route path="tickers/:base/:target" component={Ticker}/>
       <Route path="alerts" component={Alerts}/>
       <Route path="alerts/create" component={CreateAlertForm}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

watcherActions.startWatchers();