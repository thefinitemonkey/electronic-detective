import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';
import GameManager from "./GameManager.js";

class App extends React.Component {

  constructor(props) {
    super(props);

    this.props = props;
  }



  render = () => {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <div className="GameManager">
          <GameManager props={this.props} />
        </div>
      </div>
    );
  }
}

export default App;
