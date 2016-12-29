import React, { Component } from 'react';
import './App.css';
import { Link } from 'react-router'

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h2>Welcome to Crypto</h2>
          <Link to="/" className="btn btn-default" >view</Link>
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
