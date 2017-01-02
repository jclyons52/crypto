import React from 'react';
import ReactDOM from 'react-dom';
import Ticker from './Ticker';
import { Provider } from "react-redux";
import store from "../store";
import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const params = { base: "BTC", target: "USD"}

  shallow(
    <Provider store={store}>
      <Ticker
        params={params}
        />
    </Provider>);
});
