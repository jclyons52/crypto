import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TickerList from './components/TickerList.js'
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Crypto</h2>
        </div>
        <p className="App-intro">
        <div className="container">
        <TickerList></TickerList>
        </div>
        </p>
      </div>
    );
  }
}

export default App;
