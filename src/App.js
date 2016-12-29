import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Crypto</h2>
        </div>
        <div className="container">
        <div className="detail">
          {this.props.children}
        </div>
        </div>
      </div>
    );
  }
}

export default App;
