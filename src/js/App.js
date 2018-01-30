import React, { Component } from 'react';
import logo from '../logo.svg';
import '../css/App.css';

class App extends Component {

 
  constructor(props) {
    super(props);

    // Load in the JSON files for the game setup
    // Create an array of all the promises for each JSON file that we can use
    // to track when all files have been loaded
    const jsonFiles = [
      {"name":"characters.json", "function":this.createCharacters},
      {"name":"locations.json", "function":this.createLocations}, 
      {"name":"questions.json", "function":this.createQuestions},
      {"name":"casesheet.json", "function":this.createCaseSheet}
    ];
    let promises = [];
    for (const file of jsonFiles) {
      promises.push(
        fetch(`/json/${file.name}`)
        .then((response)=>{return (response.json())})
        .then((json)=>{file.function(json)})
      )
    }

    // Don't try setting up the game until we have all the game object data loaded
    const init = this.initGame;
    Promise.all(promises).then(init);
  }

  createCharacters(jsonData){
    console.log(jsonData);
  }

  createLocations(jsonData){
    console.log(jsonData);
  }

  createQuestions(jsonData){
    console.log(jsonData);
  }

  createCaseSheet(jsonData){
    console.log(jsonData);
  }


  initGame() {
    // All of the JSON data has loaded (and objects are created), so set up the game
    console.log("All JSON loaded");
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
