import React from 'react';
import ReactDOM from 'react-dom';
import TickerList from './TickerList';
import { Provider } from "react-redux";
import store from "../store";

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <TickerList />
    </Provider>,
    div);
});
